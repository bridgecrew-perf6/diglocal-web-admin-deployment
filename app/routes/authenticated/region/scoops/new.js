import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class AuthenticatedRegionScoopsNewRoute extends Route {
  model() {
    return this.store.createRecord('scoop');
  }

  @(task(function*(model) {
    yield model.save();
    this.transitionTo('authenticated.region.scoops.view', model);
  }).drop())
  saveModel;

  @action
  save(model) {
    this.saveModel.perform(model);
  }

  @action
  cancel(model) {
    model.deleteRecord();
    this.transitionTo('authenticated.region.scoops');
  }
}
