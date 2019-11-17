import Component from '@ember/component';
import { set } from '@ember/object';
import { not } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import  { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  isEditing: false,
  isReadonly: not('isEditing'),

  classNames: [ 'border rounded p-4' ],

  classNameBindings: [ 'isEditing:bg-gray-100' ],

  showDestroyModal:  false,

  init() {
    this._super(...arguments);
    set(this, 'categoryOptions', []);
    this.loadCategories.perform();
  },

  loadCategories: task(function* () {
    let categories = yield this.store.findAll('category');
    set(this, 'categoryOptions', categories);
  }),

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
      this.router.transitionTo('authenticated.businesses');
    },
  },
});
