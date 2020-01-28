import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { task, all } from 'ember-concurrency';

@classic
export default class PhotosController extends Controller {
  @service
  store;

  @service
  session;

  init() {
    super.init(...arguments);
    set(this, 'selectedPhotos', []);
  }

  @task(function*(items) {
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
  })
  deleteItems;

  @(task(function*(/*response*/) {
  }).enqueue())
  onUploadComplete;

  @task(function*() {
    yield this.model.business.hasMany('businessImages').reload();
    set(this, 'showUploadModal', false);
  })
  onAllFilesUploadComplete;

  @action
  cancelUpload() {
    set(this, 'showUploadModal', false);
  }

  @action
  didSelectFile([ file ]) {
    this.postPhoto.perform(file);
  }

  @action
  deleteSelected() {
    set(this, 'errorMessage', null);
    this.deleteItems.perform(this.selectedPhotos);
  }

  @action
  clearAllSelected() {
    this.selectedPhotos.clear();
  }
}
