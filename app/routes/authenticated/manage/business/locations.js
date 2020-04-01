import Route from '@ember/routing/route';

export default class AuthenticatedManageBusinessLocationsRoute extends Route {
  model() {
    let businessId = this.paramsFor('authenticated.manage.business').manage_business_id;
    return this.store.findRecord('business', businessId, { include: 'locations,locations.operatingHours' })
  }
}
