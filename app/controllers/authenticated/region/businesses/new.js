import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedRegionBusinessesNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    this.router.transitionTo('authenticated.region.businesses.view', model);
  }

  @action
  rollbackModel() {
    this.model.locations.invoke('rollbackAttributes');
    this.model.rollbackAttributes();
  }
}
