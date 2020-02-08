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
    let user = this.firebaseApp.auth().then(({currentUser}) =>
      currentUser ? this.store.query('user', { filter: { firebaseId: currentUser.uid}, include: 'profileImages,businesses' }).then(data => data.get('firstObject')) : resolve()
    );
    return hash({
      user,
      regions: this.store.findAll('region')
    });
  }

  afterModel(hash, transition) {
    let { user, regions } = hash;
    if (!user) {
      // TODO
    }

    this.currentUser.user = user;

    if (this.currentUser.userType && this.currentUser.isRestricted) {
      let controller = this.controllerFor('application');
      controller.showForbiddenAlert = true;
      transition.abort();
    }

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
