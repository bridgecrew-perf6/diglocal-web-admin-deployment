import Route from '@ember/routing/route';

export default class AuthenticatedRegionBusinessesViewScoopsNewRoute extends Route {
  model() {
    let business = this.modelFor('authenticated.region.businesses.view');
    return this.store.createRecord('scoop', {
      business
    });
  }
}
