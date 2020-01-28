import classic from 'ember-classic-decorator';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class UsersRoute extends Route.extend(AuthenticatedRouteMixin) {
  model() {
    let business = this.modelFor('authenticated.businesses.view');

    return hash({
      business,
      users: business.hasMany('users').reload()
    });
  }
}
