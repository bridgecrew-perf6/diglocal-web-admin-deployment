import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service session;
  @service firebaseApp;
  @service router;
  @service media;

  @tracked showSidebar = false;

  init() {
    super.init(...arguments);
    this.router.on('routeWillChange', (/*transition*/) => {
      if (this.showSidebar && this.media.isMobile) {
        this.showSidebar = false;
      }
    });
  }

  @readOnly('session.isAuthenticated') isAuthenticated;

  @computed('router.currentRouteName', 'isAuthenticated')
  get displayOutlet() {
    // prevent flash render of protected content while user logs out
    let current = this.router.currentRouteName;

    return this.isAuthenticated || ['login'].includes(current);
  }
}
