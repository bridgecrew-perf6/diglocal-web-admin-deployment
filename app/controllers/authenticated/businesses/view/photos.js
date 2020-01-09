import Controller from '@ember/controller';
import {  set } from '@ember/object';
import { task, all } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  session: service(),

  init() {
    this._super(...arguments);
    set(this, 'selectedPhotos', []);
  },

  deleteItems: task(function*(items) {
    try {
      items.invoke('deleteRecord');
      yield all(items.invoke('save'));
      this.selectedPhotos.clear();
    } catch(e) {
      if (this.selectedPhotos.length) {
        this.selectedPhotos.forEach(model => model.rollbackAttributes());
      }
      set(this, 'errorMessage', 'Oops! An error occurred. Unable to delete all selected photos.');
    }
    set(this, 'showDestroyModal', false);
  }),

  onUploadComplete: task(function*(/*response*/) {
  }).enqueue(),

  onAllFilesUploadComplete: task(function*() {
    yield this.model.business.hasMany('businessImages').reload();
    set(this, 'showUploadModal', false);
  }),

  actions: {
    cancelUpload() {
      set(this, 'showUploadModal', false);
    },
    didSelectFile([ file ]) {
      this.postPhoto.perform(file);
    },
    deleteSelected() {
      set(this, 'errorMessage', null);
      this.deleteItems.perform(this.selectedPhotos);
    },
    clearAllSelected() {
      this.selectedPhotos.clear();
    }
  }
});
