import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { action } from '@ember/object';
import { NotFoundError, ForbiddenError } from '@ember-data/adapter/error';

export default class AuthenticatedManageBusinessRoute extends Route {
  @storageFor('active-settings') activeSettingsStorage;
  @service('regions') regionsService;
  @service store;

  breadCrumb = null;

  model(params) {
    return this.store.findRecord('business', params.business_model_id);
  }

  afterModel(model) {
    this.activeSettingsStorage.set('businessId', model.id);
    this.regionsService.activeBusiness = model;
    this.regionsService.activeRegion = model.belongsTo('region').value();
  }

  @action
  error(error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      this.replaceWith('authenticated.select-business');
    } else {
      return true;
    }
  }
}
