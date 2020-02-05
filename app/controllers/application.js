import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get, computed } from '@ember/object';

@classic
export default class ApplicationController extends Controller {
  @service session;
  @service firebaseApp;
  @service router;
  @service media;

  init() {
    super.init(...arguments);
    this.router.on('routeWillChange', (/*transition*/) => {
      if (this.showSidebar && this.media.isMobile) {
        this.set('showSidebar', false);
      }
    });
  }

  showSidebar = false;

  @readOnly('session.isAuthenticated') isAuthenticated;

  @computed('router.currentRouteName', 'isAuthenticated')
  get displayOutlet() {
    // prevent flash render of protected content while user logs out
    let current = get(this, 'router.currentRouteName')

    return this.isAuthenticated || ['login'].includes(current);
  }
}
