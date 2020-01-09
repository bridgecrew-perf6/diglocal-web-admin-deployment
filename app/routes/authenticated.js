import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  firebaseApp: service(),

  model() {
    // return this.firebaseApp.auth().then(({currentUser}) =>
    //   currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid} }) : resolve()
    // );
    return this.firebaseApp.auth();
  }
});
