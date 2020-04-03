import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class AuthenticatedNewRegionController extends Controller {
  @service router;
  @service('regions') regionsService;
  @service currentUser;

  @action
  rollbackModel() {
    this.model.rollbackAttributes();
  }

  @action
  async afterSave(region) {
    this.regionsService.activeRegion = region;
    this.router.transitionTo('authenticated.index');
  }
}
