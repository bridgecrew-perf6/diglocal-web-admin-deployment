import Route from '@ember/routing/route';

export default class AuthenticatedRegionBusinessesViewLocationsRoute extends Route {
  model() {
    let businessId = this.paramsFor('authenticated.region.businesses.view').business_id;
    return this.store.findRecord('business', businessId, { include: 'locations,locations.operatingHours' })
  }
}
