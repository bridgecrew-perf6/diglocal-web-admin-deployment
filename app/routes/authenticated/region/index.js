import Route from '@ember/routing/route';

export default class AuthenticatedRegionIndexRoute extends Route {
  breadCrumb = null;

  redirect() {
    this.replaceWith('authenticated.region.businesses');
  }
}
