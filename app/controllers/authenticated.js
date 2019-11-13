import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),
  router: service(),
  media: service('media'),

  init() {
    this._super(...arguments);
    this.router.on('routeWillChange', (/*transition*/) => {
      if (this.showSidebar && this.media.isMobile) {
        this.set('showSidebar', false);
      }
    });
  },

  showSidebar: false,
});
