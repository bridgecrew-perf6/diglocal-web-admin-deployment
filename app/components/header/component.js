import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),

  tagName: 'header',

  classNames: [ 'header' ],

  onLogout() {},

  actions: {
    logout() {
      this.onLogout();
    }
  }

});
