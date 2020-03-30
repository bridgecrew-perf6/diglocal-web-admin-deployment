import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedRegionBusinessesViewIndexController extends Controller {
  @service session;

  @action
  rollbackModel() {
    this.model.rollbackAttributes();
    this.model.hasMany('categories').reload();
  }
}
