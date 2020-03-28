import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class DetailsForm extends Component {
  @service store;
  @service regions;
  @service router;
  @tracked showDestroyModal = false;
  @tracked showUploadModal = false;
  @tracked categoryOptions = [];

  constructor() {
    super(...arguments);
    this.loadCategories.perform();
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
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
