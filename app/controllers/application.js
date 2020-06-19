import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from 'diglocal-manage/config/environment';

const isStagingEnv = config.environment === 'staging';
export default class ApplicationController extends Controller {
  @service session;
  @service firebaseApp;
  @service router;
  @service media;
  @service currentUser;

  @tracked showSidebar = false;
  @tracked showForbiddenAlert = false;

  showStagingBanner = isStagingEnv;

  init() {
    super.init(...arguments);
    this.router.on('routeWillChange', (/*transition*/) => {
      if (this.showSidebar && this.media.isMobile) {
        this.showSidebar = false;
      }
    });
  }

  @action
  invalidate() {
    this.session.invalidate();
    this.showForbiddenAlert = false;
  }
}
