import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedManageRoute extends Route {
  @service('regions') regionsService;
  @service currentUser;

  breadCrumb = null;

  redirect() {
    let activeBusiness = this.regionsService.activeBusiness;

    let needsToSelectBusiness = !activeBusiness && !this.currentUser.isAdmin;

    if (this.currentUser.isAdmin) {
      this.replaceWith('authenticated.index');
    }

    if (needsToSelectBusiness) {
      this.replaceWith('authenticated.select-business');
    } else {
      return this.currentUser.isAdmin ?
        this.replaceWith('authenticated.index') :
        null;
        // this.replaceWith('authenticated.manage.business.index', this.regionsService.activeBusiness.id);
    }
  }
}
