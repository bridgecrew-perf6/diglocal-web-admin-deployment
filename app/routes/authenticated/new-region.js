import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedNewRegionRoute extends Route {
  @service currentUser;

  beforeModel() {
    if (!this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }
  }

  model() {
    return this.store.createRecord('region', {
      timeZone: 'Eastern Time (US & Canada)'
    });
  }
}
