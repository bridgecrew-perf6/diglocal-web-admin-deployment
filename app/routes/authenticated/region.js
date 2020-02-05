import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default class AuthenticatedRegionRoute extends Route {
  @storageFor('active-region') activeRegionStorage;
  @service regions;
  @service store;

  breadCrumb = null;

  model(params) {
    return this.store.findRecord('region', params.id);
  }

  afterModel(model) {
    this.activeRegionStorage.set('regionId', model.id);
    this.regions.activeRegion = model;
  }
}
