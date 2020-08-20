import Route from '@ember/routing/route';

export default class AuthenticatedRegionBusinessesViewHomesViewRoute extends Route {
  model(params) {
    return this.store.findRecord('home', params.home_id, { include: 'location,location.business,digitalAssets,avatar' } );
  }
}
