import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get, action, computed } from '@ember/object';

@classic
export default class ApplicationController extends Controller {
  @service('session')
  session;

  @service
  firebaseApp;

  @service
  router;

  @readOnly('session.isAuthenticated')
  isAuthenticated;

  @computed('router.currentRouteName')
  get displayOutlet() {
    // prevent flash render of protected content while user logs out
    let current = get(this, 'router.currentRouteName')

    return ['login'].includes(current);
  }

  @action
  logout() {
    get(this, 'session').invalidate();
  }
}
