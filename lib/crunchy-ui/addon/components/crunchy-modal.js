import Component from '@ember/component';
import layout from '../templates/components/crunchy-modal';

export default Component.extend({
  layout,

  onClose() {},

  actions: {
    close() {
      this.onClose();
    }
  }
});
