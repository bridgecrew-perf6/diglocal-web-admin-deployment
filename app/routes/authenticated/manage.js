import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedManageRoute extends Route {
  @service currentUser;

  breadCrumb = null;

  redirect() {
    if (this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }
  }
}
