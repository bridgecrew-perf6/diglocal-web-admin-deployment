import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

@classic
export default class AuthenticatedRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  session;

  @service
  firebaseApp;

  model() {
    // return this.firebaseApp.auth().then(({currentUser}) =>
    //   currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid} }) : resolve()
    // );
    return this.firebaseApp.auth();
  }
}
