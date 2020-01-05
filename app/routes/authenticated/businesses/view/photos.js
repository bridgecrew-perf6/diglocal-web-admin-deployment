import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    // let businessId = this.paramsFor('authenticated.businesses.view').id;
    // let filter = { business: businessId };

    let business = this.modelFor('authenticated.businesses.view');

    return hash({
      business,
      businessImages: business.hasMany('businessImages').load()
    });
  },

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.setProperties({
        selectedPhotos: [],
        errorMessage: null
      });
    }
  },

});
