import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRegionBusinessesNewRoute extends Route {
  @service regions;

  model() {
    let activeRegion = this.regions.activeRegion;
    let business = this.store.createRecord('business', {
      region: activeRegion
    });
    // TODO - backend is doing this for us upon save of new business, need to update API with new logic
    let location = this.store.createRecord('location', {
      business
    });
    business.locations.pushObject(location);
    return business;
  }
}
