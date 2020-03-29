import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { action } from '@ember/object';
import { NotFoundError, ForbiddenError } from '@ember-data/adapter/error';

export default class AuthenticatedRegionRoute extends Route {
  @storageFor('active-settings') activeSettingsStorage;
  @service('regions') regionsService;
  @service store;
  @service currentUser;
  
  breadCrumb = null;

  beforeModel() {
    if (!this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }
  }

  model(params) {
    return this.store.findRecord('region', params.region_id);
  }

  afterModel(model) {
    this.activeSettingsStorage.set('regionId', model.id);
    this.regionsService.activeRegion = model;
    this.activeSettingsStorage.set('businessId', null);
    this.regionsService.activeBusiness = null;
  }

  @action
  error(error) {
   if (error instanceof NotFoundError || error instanceof ForbiddenError) {
     this.replaceWith('/');
   } else {
     return true;
   }
  }
}
