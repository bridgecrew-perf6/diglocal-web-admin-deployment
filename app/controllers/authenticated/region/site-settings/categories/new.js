import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedRegionSiteSettingsCategoriesNewController extends Controller {
  @service router;

  @action
  afterSave(model) {
    this.router.transitionTo('authenticated.region.site-settings.categories.view', model.id);
  }
}
