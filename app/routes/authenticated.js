import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { resolve, hash } from 'rsvp';
import { storageFor } from 'ember-local-storage';

@classic
class AuthenticatedRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service session;
  @service firebaseApp;
  @service('regions') regionsService;
  @service currentUser;
  @storageFor('active-region') activeRegionStorage;

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
    if (!currentUser) {
      // TODO
    }

    this.currentUser.user = currentUser;
    this.regionsService.regions = regions;

    if (regions.length === 1) {
      this.regionsService.activeRegion = regions.firstObject;
      return;
    }

    let lastActiveRegionId = this.activeRegionStorage.get('regionId');
    let foundActiveRegion = regions.toArray().findBy('id', lastActiveRegionId);
    this.regionsService.activeRegion = foundActiveRegion ? foundActiveRegion : null;
  }
}

export default AuthenticatedRoute;
