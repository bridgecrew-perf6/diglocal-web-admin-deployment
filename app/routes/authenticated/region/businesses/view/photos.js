import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
class AuthenticatedRegionBusinessesViewPhotosRoute extends Route {
  model() {
    let business = this.modelFor('authenticated.region.businesses.view');

    return hash({
      business,
      businessImages: business.hasMany('businessImages').load()
    });
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.setProperties({
        selectedPhotos: [],
        errorMessage: null
      });
    }
  }
}

export default AuthenticatedRegionBusinessesViewPhotosRoute;
