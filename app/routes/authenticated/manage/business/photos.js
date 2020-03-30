import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class AuthenticatedManageBusinessPhotosRoute extends Route {
  model() {
    let business = this.modelFor('authenticated.manage.business');

    return hash({
      business,
      businessImages: business.hasMany('businessImages').load()
    });
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.selectedPhotos = [];
      controller.errorMessage = null;
    }
  }
}
