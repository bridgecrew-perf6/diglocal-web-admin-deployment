import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class AuthenticatedController extends Controller {
  @service session;
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
}
