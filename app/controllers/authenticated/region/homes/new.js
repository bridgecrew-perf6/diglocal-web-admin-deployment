import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedRegionHomesNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    let business = model.belongsTo('business').value();
    this.router.transitionTo('authenticated.region.businesses.view.homes.view', business.id, model.id);
  }

  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }
}
