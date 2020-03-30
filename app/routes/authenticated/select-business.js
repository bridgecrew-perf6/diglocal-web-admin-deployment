import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedSelectBusinessRoute extends Route {
  @service currentUser;

  redirect() {
    if (this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }
  }
}
