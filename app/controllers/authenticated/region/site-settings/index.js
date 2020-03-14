import Controller from '@ember/controller';
import { action } from '@ember/object'

export default class AuthenticatedRegionSiteSettingsIndexController extends Controller {
  @action
  rollbackModel() {
    return this.model.rollbackAttributes();
  }
}
