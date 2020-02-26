import Route from '@ember/routing/route';

export default class AuthenticatedRegionScoopsNewRoute extends Route {
  model() {
    return this.store.createRecord('scoop');
  }
}
