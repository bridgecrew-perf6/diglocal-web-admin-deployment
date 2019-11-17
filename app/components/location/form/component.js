import Component from '@ember/component';
import { not } from '@ember/object/computed';

export default Component.extend({
  isEditing: false,
  isReadonly: not('isEditing'),

  classNames: [ 'border rounded p-4' ],

  classNameBindings: [ 'isEditing:bg-gray-100' ],

  showDestroyModal:  false,

  rollbackModel() {
    if (this.model && this.model.get('hasDirtyAttributes')) {
      this.model.rollbackAttributes();
    }
  },

  willDestroyElement() {
    this.rollbackModel();
    this.setProperties({
      showDestroyModal: false,
      isEditing: false
    });
    this._super(...arguments);
  },

  actions: {
    save() {
      this.model.save();
      this.set('isEditing', false);
    },
    cancel() {
      this.rollbackModel();
      this.set('isEditing', false);
    },
    delete() {
      this.model.deleteRecord();
      this.model.save();
    },
  },
});
