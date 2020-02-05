import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { resolve, hash } from 'rsvp';

@classic
export default class AuthenticatedRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service session;
  @service firebaseApp;
  @service regions;
  @service currentUser;

  model() {
    let currentUser = this.firebaseApp.auth().then(({currentUser}) =>
      currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid}, include: 'profileImages,businesses' }).then(data => data.get('firstObject')) : resolve()
    );
    return hash({
      currentUser,
      regions: this.store.findAll('region')
    });
  }

  afterModel(hash) {
    let { currentUser, regions } = hash;
    console.log(currentUser);
    if (!currentUser) {
      // TODO
    }
    this.currentUser.user = currentUser;
    this.regions.set('regions', regions);
    this.regions.set('activeRegion', regions.firstObject);
  }
}
