import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionRoute extends Route {
  @service regions;
  @service store;

  breadCrumb = null;

  model(params) {
    return this.store.findRecord('region', params.id);
  }

  afterModel(model) {
    if (model.id !== this.regions.activeRegion.id) {
      this.regions.activeRegion = model;
    }
  }
}
