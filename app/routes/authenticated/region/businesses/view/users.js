import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class UsersRoute extends Route.extend() {
  model() {
    let business = this.modelFor('authenticated.region.businesses.view');

    return hash({
      business,
      users: business.hasMany('users').reload()
    });
  }
}
