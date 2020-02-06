import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenticatedRegionBusinessesViewUsersRoute extends Route {
  model() {
    let business = this.modelFor('authenticated.region.businesses.view');

    return hash({
      business,
      users: business.hasMany('users').reload()
    });
  }
}
