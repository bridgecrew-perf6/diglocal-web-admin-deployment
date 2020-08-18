import Component from '@glimmer/component';
// Continue to use set in this file. Do not change.
import { action, set } from '@ember/object';
import { filterBy, equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from "@glimmer/tracking";
import config from 'diglocal-manage/config/environment';

const UPLOAD_DEBOUNCE = config.environment !== 'test' ? 250 : 0;
export default class FirebaseUploaderComponent extends Component {
  @service ajax;
  @service firebaseApp;
  @service store;
  @tracked totalFiles = 0;
  @tracked totalFilesUploaded = 0;
  @tracked uploadTasks = [];

  noop() {}

  @filterBy('uploadTasks', 'isStatusError') errorTasks;
  @filterBy('uploadTasks', 'isStatusComplete') completeTasks;

  @(task({
    preview: null,
    status: 'paused',
    progress: 0,
    progressText: '',
    fileUrl: '',

    isStatusComplete: equal('status', 'success'),
    isStatusError: equal('status', 'error'),
    isStatusPending: equal('status', 'paused'),
    isStatusUploaded: equal('status', 'uploaded'),

    *perform(file) {
      let firebaseApp = this.context.firebaseApp;
      let storage = yield firebaseApp.storage();
      let storageRef = storage.ref();

      let handler = (data) => { set(this, 'preview', data) };
      handler.bind(this);
      yield resizeImageToSpecificWidth(file, 128, handler);

      let uuid = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);
      let firebaseUploadTask = storageRef.child(`${this.context.args.pathName}/${uuid()}/${file.name}`).put(file, { cacheControl: 'public,max-age=31536000' });

      return firebaseUploadTask.on('state_changed',
        (snapshot) => {
        /**
         * Observe Firebase upload task
         */
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          set(this, 'progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
          set(this, 'progress', progress);
          set(this, 'status', firebaseUploadTask.snapshot.state);
        }, (error) => {
        /**
         * Handle Firebase upload error 
         */
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
        set(this, 'status', 'error');
        this.context.onUploadErrored(error);
      }, async () => {
        /**
        * Handle Firebase upload success
        */
        try {
          let digitalAsset = await this.context.createDigitalAssetFromSnapsnot(firebaseUploadTask.snapshot);

          set(this, 'status', firebaseUploadTask.snapshot.state);
          set(this, 'fileUrl', firebaseUploadTask.snapshot.metadata.fullPath);

          let successHandler = this.context.onUploadSucceeded;

          if (successHandler) {
            return await successHandler(digitalAsset);
          }
        } catch(error) {
          set(this, 'status', 'error');
          this.context.onUploadErrored(error);
        }
      });
    }
  }).enqueue().maxConcurrency(1)) uploadImageTask;

  @action
  async onUploadSucceeded(digitalAsset) {
    this.totalFilesUploaded += 1;
    await (this.args.onUploadComplete || this.noop)(digitalAsset);
    if (this.uploadImageTask.numQueued === 0) {
      await (this.args.onAllFilesUploadComplete || this.noop)();
      if (this.args.resetAfterUpload) {
        this.resetUploader();
      }
    }
  }

  @action
  onUploadErrored(taskInstance, error) {
    (this.args.onUploadError || this.noop)(error);
  }

  @action
  didSelectFiles(files) {
    this.totalFiles = files.length;
    for (let file of files) {
      this.uploadTasks.pushObject(this.uploadImageTask.perform(file));
    }
  }

  @action
  async createDigitalAssetFromSnapsnot(snapshot) {
    let digitalAsset = this.store.createRecord('digitalAsset', {
      bucket: snapshot.metadata.bucket,
      filename: snapshot.metadata.name,
      fullPath: snapshot.metadata.fullPath,
      size: snapshot.metadata.size,
      contentType: snapshot.metadata.contentType,
      raw: snapshot.metadata
    });
    
    return await this.generateThumbnailsForAsset(digitalAsset);
  }

  @action
  async generateThumbnailsForAsset(digitalAsset) {
    let thumbnails = await this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(digitalAsset.raw, { sizes: ['256_outside', '512_outside', '1024_outside'] })
      }
    });

    digitalAsset.downloadUrls = thumbnails.result.downloadURLs;
    await digitalAsset.save();
    return digitalAsset;
  }

  resetUploader() {
    this.uploadTasks = [];
    this.totalFiles = 0;
    this.totalFilesUploaded = 0;
  }

  willDestroy() {
    this.resetUploader();
  }
}

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
