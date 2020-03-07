import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionBusinessesNewRoute extends Route {
  @service regions;

  model() {
    let activeRegion = this.regions.activeRegion;
    let business = this.store.createRecord('business', {
      region: activeRegion,
      role: 'temporary'
    });
    return business;
  }
}
