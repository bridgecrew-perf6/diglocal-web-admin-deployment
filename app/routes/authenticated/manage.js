import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedManageRoute extends Route {
  @service('regions') regionsService;
  @service currentUser;

  breadCrumb = null;

  redirect() {
    let activeRegion = this.regionsService.activeRegion;

    let needsToSelectRegion = !activeRegion && this.currentUser.isAdmin;

    if (needsToSelectRegion) {
      this.replaceWith('authenticated.select-region');
    } else if (this.currentUser.isAdmin) {
      this.replaceWith('authenticated.region.businesses', this.regionsService.activeRegion.id);
    }
  }
}
