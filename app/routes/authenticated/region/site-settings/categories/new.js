import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionSiteSettingsCategoriesNewRoute extends Route {
  @service('regions') regionsService;

  model() {
    let region = this.regionsService.activeRegion;

    return this.store.createRecord('category', {
      region
    });
  }

  @(task(function*(model) {
    yield model.save();
    this.transitionTo('authenticated.region.site-settings.categories.view', model);
  }).drop())
  saveModel;

  @action
  save(model) {
    this.saveModel.perform(model);
  }

  @action
  cancel(model) {
    model.deleteRecord();
    this.transitionTo('authenticated.region.site-settings.categories.index');
  }
}
