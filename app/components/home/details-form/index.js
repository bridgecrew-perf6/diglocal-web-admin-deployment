import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import removeEmpty from 'diglocal-manage/helpers/remove-empty';
import config from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class DetailsForm extends Component {
  @service ajax;
  @service currentUser;
  @service notifications;
  @service regions;
  @service router;
  @service store;

  @tracked showDestroyModal = false;
  @tracked showEventFields = true;
  @tracked showUploadModal = false;

  assets = [];

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    super.willDestroy(...arguments);
  }

  @(task(function* (search) {
    yield timeout(INPUT_DEBOUNCE);
    let regionId = this.regions.activeRegion.id;
    let filter = Object.assign({}, { search, region: regionId });
    filter = removeEmpty(filter);
    return this.store.query('business', { filter });
  }).restartable())
  searchBusinesses;

  // @(task(function*(/*response*/) {
  // }).enqueue())
  // onUploadComplete;

  // @task(function*() {
  //   yield this.args.model.hasMany('digitalAssets').reload();
  //   this.showUploadModal = false;
  // })
  // onAllFilesUploadComplete;

  @task(function*() {
    let model = yield this.args.model.save();
    this.isEditing = false;
    if (this.args.afterSave) {
      return this.args.afterSave(model);
    }
    this.notifications.success('Saved successfully!');
    return model;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.businesses.view.homes.index');
  })
  deleteTask;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    return this.rollbackModel();
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }

  @action
  updateLocation(placeDetails) {
    this.args.model.geoLocation = [
      placeDetails.geometry.location.lat(),
      placeDetails.geometry.location.lng()
    ];
  }

  @action
  async onFileUploadComplete(asset) {
    this.args.model.digitalAssets.addObject(asset);
  }

  @action
  async onAllFilesUploadComplete() {
    await this.args.model.save();
    this.showUploadModal = false;
  }
}
