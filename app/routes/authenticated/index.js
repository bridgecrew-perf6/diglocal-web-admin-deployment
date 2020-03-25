import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedIndexRoute extends Route {
  @service('regions') regionsService;
  @service currentUser;

  breadCrumb = null;

  redirect() {
    if (this.currentUser.isRestricted) {
      return;
    }
    
    let activeRegion = this.regionsService.activeRegion;
    let activeBusiness = this.regionsService.activeBusiness;

    let needsToSelectRegion = !activeRegion && this.currentUser.isAdmin;
    let needsToSelectBusiness = !activeBusiness && this.currentUser.isMultiBusinessOwner;

  
    if (needsToSelectRegion) {
      this.replaceWith('authenticated.select-region');
    } else if (needsToSelectBusiness) {
      this.replaceWith('authenticated.select-business');
    } else {    
      this.currentUser.isAdmin ?
        this.replaceWith('authenticated.region.businesses.index', activeRegion) :
        this.replaceWith('authenticated.manage.business.index', activeBusiness);
    }
  }
}
