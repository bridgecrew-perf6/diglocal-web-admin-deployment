import Component from '@ember/component';
import {  set, computed } from '@ember/object';
import { filterBy, equal } from '@ember/object/computed';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { task, all, timeout } from 'ember-concurrency';
import { on } from '@ember/object/evented';
import fetch from 'fetch';
import ENV from 'diglocal-manage/config/environment';

const UPLOAD_DEBOUNCE = ENV.environment !== 'test' ? 500 : 0;

export default Component.extend({
  session: service(),
  store: service(),
  totalFiles: 0,
  totalFilesUploaded: 0,
  uploadTasks: A(),
  tagName: '',

  errorTasks: filterBy('uploadTasks', 'isStatusError'),
  completeTasks: filterBy('uploadTasks', 'isStatusComplete'),

  didInsertElement() {
    this._super(...arguments);
    set(this, 'uploadTasks', A());
  },

  model: null,
  modelType: '',
  keyForImage: '',

  onUploadError() {},
  onUploadComplete() {},
  onAllFilesUploadComplete() {},

  uploadUrl: computed('model', function() {
    let adapter = this.store.adapterFor(this.modelType);
    let url = adapter.buildURL(this.modelType, this.model.id);
    return url;
  }),

  uploadImageTask: task({
    preview: null,
    status: 'pending',

    isStatusComplete: equal('status', 'complete'),
    isStatusError: equal('status', 'error'),
    isStatusPending: equal('status', 'pending'),

    *perform(file) {
      let handler = (data) => { set(this, 'preview', data) };
      handler.bind(this);
      yield resizeImageToSpecificWidth(file, 128, handler);
      let fd = new FormData();
      let model = this.context.model;
      let data = model.serialize().data;
      if (!model.isNew) {
        data.id = model.id;
      }
      let requestMethod = data.id ? 'PATCH' : 'POST';
      fd.append('data', JSON.stringify(data));
      fd.append(`attributes.${this.context.keyForImage}`, file);
      try {
        let request = fetch(this.context.uploadUrl, {
          method: requestMethod,
          body: fd,
          headers: {
            'Authorization': `Bearer ${this.context.get('session.data.authenticated.credential.i')}`
          }
        });

        let promises = yield all([
          request,
          timeout(UPLOAD_DEBOUNCE)
        ]);

        let response = promises[0];

        if (response.ok) {
          set(this, 'status', 'complete')
          let json = yield response.json();
          return json;
        } else {
          set(this, 'status', 'error');
        }
      } catch(e) {
        set(this, 'status', 'error');
      }
    }
  }).enqueue().maxConcurrency(1).evented(),

  onUploadSucceeded: on('uploadImageTask:succeeded', function (taskInstance) {
    if (taskInstance.status === 'complete') {
      this.incrementProperty('totalFilesUploaded');
      this.onUploadComplete(taskInstance.value);
      if (this.uploadImageTask.numQueued === 0) {
        this.onAllFilesUploadComplete();
      }
    }
  }),

  onUploadErrored: on('uploadImageTask:errored', function (taskInstance, error) {
    this.onUploadError(error);
  }),

  willDestroyElement() {
    this.uploadTasks.clear();
    this.setProperties({
      totalFiles: 0,
      totalFilesUploaded: 0,
    });
    this._super(...arguments);
  },

  actions: {
    didSelectFiles(files) {
      set(this, 'totalFiles', files.length);

      for (let file of files) {
        this.uploadTasks.pushObject(this.uploadImageTask.perform(file));
      }
    }
  }
});

async function resizeImageToSpecificWidth(file, max, cb) {
  var data;
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      if (img.width > max) {
        var oc = document.createElement('canvas'),
            octx = oc.getContext('2d');

        oc.width = img.width;
        oc.height = img.height;
        octx.drawImage(img, 0, 0);
        if( img.width > img.height) {
          oc.height = (img.height / img.width) * max;
          oc.width = max;
        } else {
          oc.width = (img.width / img.height) * max;
          oc.height = max;
        }
        octx.drawImage(oc, 0, 0, oc.width, oc.height);
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        data = oc.toDataURL();
      } else {
        let oc = document.createElement('canvas');
        data = oc.toDataURL();
      }
      cb(data);
    };
    img.src = event.target.result;
  };
  await reader.readAsDataURL(file);
}
