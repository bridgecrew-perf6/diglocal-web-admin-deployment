import config from 'diglocal-manage/config/environment';
import Component from '@ember/component';
import { set } from '@ember/object';
import { not } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default Component.extend({
  isEditing: false,
  isReadonly: not('isEditing'),

  classNames: [ 'border rounded p-4' ],

  classNameBindings: [ 'isEditing:bg-gray-100' ],

  didSearch: task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
  }).restartable(),

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
      this.set('isEditing', false);
    },
    cancel() {
      this.rollbackModel();
      this.set('isEditing', false);
    },
    delete() {
      this.model.deleteRecord();
      this.model.save();
    }
  },
});
