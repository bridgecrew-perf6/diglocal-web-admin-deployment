import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { task, all } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class BusinessNewFormComponent extends Component {
  @service store;
  @service regions;
  @service router;

  @tracked categoryOptions = [];

  roleOptions = [
    'temporary',
    'premium',
    '2types'
  ];

  constructor() {
    super(...arguments);
    this.loadCategories.perform();
  }

  willDestroy() {
    this.rollbackModel();
  }

  @task(function* () {
    let regionId = this.regions.activeRegion.id;
    let categories = yield this.store.query('category', { region: regionId });
    this.categoryOptions = categories;
  })
  loadCategories;

  rollbackModel() {
    if (this.args.model) {
      let locations = (this.args.model.hasMany('locations').value() || []).toArray();
      locations.invoke('rollbackAttributes');
      this.args.model.rollbackAttributes();
    }
  }

  @task(function*() {
    let model = this.args.model;
    yield model.save();
    //  TODO: This results in second location being created because API auto-creates location
    let locations = model.locations.filterBy('hasDirtyAttributes');
    yield all(locations.invoke('save'));
    if (this.args.afterSave) {
      return this.args.afterSave(this.args.model);
    }
    return this.args.model;
  })
  saveTask;

  @action
  save() {
    return this.saveTask.perform();
  }

  @action
  cancel() {
    this.rollbackModel();
    this.router.transitionTo('authenticated.region.businesses.index');
  }
}
