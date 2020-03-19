import Route from '@ember/routing/route';

export default class AuthenticatedNewRegionRoute extends Route {
  model() {
    return this.store.createRecord('region', {
      timeZone: 'Eastern Time (US & Canada)'
    });
  }
}
