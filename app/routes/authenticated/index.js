import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
  breadCrumb: null,

  redirect() {
    this.replaceWith('authenticated.businesses');
  }
});
