import Component from '@ember/component';
import { not } from '@ember/object/computed';

export default Component.extend({
  isEditing: false,
  isReadonly: not('isEditing'),

  classNames: [ 'border rounded p-4' ],

  classNameBindings: [ 'isEditing:bg-gray-100' ],

  rollbackModel() {
    if (this.model && this.model.get('hasDirtyAttributes')) {
      this.model.rollbackAttributes();
    }
  },

  willDestroyElement() {
    this.rollbackModel();
    this._super(...arguments);
  },

  actions: {
    save() {
      this.model.save();
    },
    cancel() {
      this.rollbackModel();
      this.set('isEditing', false);
    },
    delete() {
      this.model.deleteRecord();
      this.model.save();
    }
  }
});
