import Component from '@ember/component';

export default Component.extend({
  isRemovable: true,
  showRemoveModal: false,

  onRemove() {},

  actions: {
    remove() {
      this.onRemove(this.model);
      this.set('showRemoveModal', false);
    }
  }
});
