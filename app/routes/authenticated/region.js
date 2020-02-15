import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { action } from '@ember/object';
import { NotFoundError, ForbiddenError } from '@ember-data/adapter/error';

export default class AuthenticatedRegionRoute extends Route {
  @storageFor('active-region') activeRegionStorage;
  @service('regions') regionsService;
  @service store;
  @service moment;

  breadCrumb = null;

  model(params) {
    return this.store.findRecord('region', params.region_id);
  }

  afterModel(model) {
    this.activeRegionStorage.set('regionId', model.id);
    this.regionsService.activeRegion = model;
  }

  @action
  error(error) {
   if (error instanceof NotFoundError || error instanceof ForbiddenError) {
     this.replaceWith('authenticated.select-region');
   } else {
     return true;
   }
  }
}
