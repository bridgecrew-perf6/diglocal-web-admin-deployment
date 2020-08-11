import Route from '@ember/routing/route';

export default class AuthenticatedRegionBusinessesViewHomesNewRoute extends Route {
  model() {
    let businessId = this.paramsFor('authenticated.region.businesses.view').business_id;
    let business = this.store.peekRecord('business', businessId);
    return this.store.createRecord('home', {
      address: {},
      links: {},
      additionalDetails: {},
      location: business.locations.firstObject
    });
  }
}
