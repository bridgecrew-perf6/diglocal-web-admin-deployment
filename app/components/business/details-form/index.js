import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
  @service store;
  @service regions;
  @service router;
  @service currentUser;
  @service notifications;
  @tracked showDestroyModal = false;
  @tracked showUploadModal = false;
  @tracked categoryOptions = [];

  roleOptions = [
    'temporary',
    'premium',
    '2types'
  ];

  constructor() {
    super(...arguments);
    this.loadCategories.perform();
    if (typeof this.args.model.takeSnapshot === 'function') {
      this.args.model.takeSnapshot(['categories']);
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
  }

  get canAddMultiCategories() {
    return this.args.model.role === '2types';
  }

  @task(function* () {
    let regionId = this.regions.activeRegion.id;

    let categories = yield this.store.query('category', { filter: { region: regionId }});
    this.categoryOptions = categories;
  })
  loadCategories;

  rollbackModel() {
    if (this.args.rollbackModel) {
      return this.args.rollbackModel();
    }
  }

  @task(function*() {
    yield this.args.model.save();
    if (this.args.afterSave) {
      return this.args.afterSave(this.args.model);
    }
    this.notifications.success('Saved successfully!');
    return this.args.model;
  })
  saveTask;

  @task(function*() {
    yield this.args.model.deleteRecord();
    yield this.args.model.save();
    this.router.transitionTo('authenticated.region.businesses.index');
  })
  deleteTask;

  @(task(function* (/*response*/) {
  }).enqueue())
  onUploadComplete;

  @task(function* () {
    yield this.args.model.reload();
    this.showUploadModal = false;
  })
  onAllFilesUploadComplete;

  @action
  didChangeCategories(updated) {
    this.args.model.categories = updated;
  }

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    this.rollbackModel();
  }

  @action
  delete() {
    return this.deleteTask.perform();
  }
}
