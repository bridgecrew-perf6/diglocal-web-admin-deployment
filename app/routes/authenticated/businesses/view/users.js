import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let { id } = this.paramsFor('authenticated.businesses.view');
    let filter = { businesses: id };

    // return this.store.query('user', { filter });
    return hash({
      business: this.modelFor('authenticated.businesses.view'),
      users: this.store.query('user', { filter })
    });
  },


});
