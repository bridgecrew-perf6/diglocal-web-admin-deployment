import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedRegionBusinessesViewHomesNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    this.router.transitionTo('authenticated.region.businesses.view.homes.view', model);
  }

  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
