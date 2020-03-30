import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task, all } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedManageBusinessPhotosController extends Controller {
  @service store;
  @service session;

  @tracked selectedPhotos = [];
  @tracked errorMessage;
  @tracked showDestroyModal = false;
  @tracked showUploadModal = false;

  @task(function*(items) {
    try {
      items.invoke('deleteRecord');
      yield all(items.invoke('save'));
      this.selectedPhotos.clear();
    } catch(e) {
      if (this.selectedPhotos.length) {
        this.selectedPhotos.forEach(model => model.rollbackAttributes());
      }
      this.errorMessage = 'Oops! An error occurred. Unable to delete all selected photos.';
    }
    this.showDestroyModal = false;
  })
  deleteItems;

  @(task(function*(/*response*/) {
  }).enqueue())
  onUploadComplete;

  @task(function*() {
    yield this.model.business.hasMany('businessImages').reload();
    this.showUploadModal = false;
  })
  onAllFilesUploadComplete;

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }

  @action
  deleteSelected() {
    this.errorMessage = null;
    this.deleteItems.perform(this.selectedPhotos);
  }

  @action
  clearAllSelected() {
    this.selectedPhotos.clear();
  }
}
