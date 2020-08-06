import Route from '@ember/routing/route';

export default class AuthenticatedRegionHomesNewRoute extends Route {
  model() {
    return this.store.createRecord('home');
  }
}
