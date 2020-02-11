import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedIndexRoute extends Route {
  @service('regions') regionsService;

  breadCrumb = null;

  redirect() {
    let activeRegion = this.regionsService.activeRegion;
    if (!activeRegion) {
      this.replaceWith('authenticated.select-region');
    } else {
      this.replaceWith('authenticated.region.businesses', this.regionsService.activeRegion.id);
    }
  }
}
