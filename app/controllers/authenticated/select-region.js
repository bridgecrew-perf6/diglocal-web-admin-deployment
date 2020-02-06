import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSelectRegionController extends Controller {
  @service('regions') regionsService;
  @service router;

  @action
  didSelectActiveRegion(region) {
    this.router.transitionTo('authenticated.region', region.id);
  }
}
