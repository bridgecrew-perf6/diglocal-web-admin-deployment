import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

@classic
class AuthenticatedRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service session;
  @service firebaseApp;
  @service('regions') regionsService;
  @service currentUser;
  @storageFor('active-settings') activeSettingsStorage;

  model() {
    // If the current user is not an admin, then we already have all of the regions loaded
    // in the store already, included when we fetched the user record and their businesses and business regions
    return this.currentUser.isAdmin ? this.store.query('region', { filter: { active: [true,false] }}) : this.store.peekAll('region');
  }

  afterModel(model) {
    this.regionsService.regions = model;

    if (this.currentUser.isAdmin) {
      this.regionsService.activeBusiness = null;
    }

    if (this.currentUser.isSingleBusinessOwner) {
      let business = this.currentUser.user.hasMany('businesses').value().firstObject;
      let defaultRegion = business.belongsTo('region').value();
      this.regionsService.activeRegion = defaultRegion;
      this.regionsService.activeBusiness = business;
      return;
    }

    if (this.currentUser.isMultiOwner) {
      let lastActiveBusinessId = this.activeSettingsStorage.get('businessId');
      let foundActiveBusiness = this.currentUser.user.hasMany('businesses').value().toArray().findBy('id', lastActiveBusinessId);
      this.regionsService.activeBusiness = foundActiveBusiness ? foundActiveBusiness.belongsTo('region').value() : null;
    }

    if (model.length === 1) {
      this.regionsService.activeRegion = model.firstObject;
      return;
    }

    let lastActiveRegionId = this.activeSettingsStorage.get('regionId');
    let foundActiveRegion = model.toArray().findBy('id', lastActiveRegionId);
    this.regionsService.activeRegion = foundActiveRegion ? foundActiveRegion : null;
  }

}

export default AuthenticatedRoute;
