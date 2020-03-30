import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenticatedManageBusinessUsersRoute extends Route {
  breadCrumb = {
    title: 'Members'
  };

  model() {
    let business = this.modelFor('authenticated.manage.business');

    return hash({
      business,
      users: business.hasMany('users').reload()
    });
  }
}
