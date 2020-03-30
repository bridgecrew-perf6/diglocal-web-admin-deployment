import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedSelectRegionRoute extends Route {
  @service currentUser;

  beforeModel() {
    if (!this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }
  }
}
