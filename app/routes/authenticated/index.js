import classic from 'ember-classic-decorator';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  breadCrumb = null;

  redirect() {
    this.replaceWith('authenticated.businesses');
  }
}
