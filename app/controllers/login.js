import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @tracked isLogin = true;
}
