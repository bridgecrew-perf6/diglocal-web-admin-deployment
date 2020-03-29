import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedManageBusinessIndexController extends Controller {
  @action
  rollbackModel() {
    this.model.rollbackAttributes();
    this.model.hasMany('categories').reload();
  }
}
