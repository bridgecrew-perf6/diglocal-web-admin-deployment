import Component from '@ember/component';
import layout from '../../templates/components/crunchy-modal/header';

export default Component.extend({
  layout,

  classNames: [ 'crunchy-modal__header', 'relative' ],

  onClose() {},

  actions: {
    close() {
      this.onClose();
    }
  }
});
