import Component from '@ember/component';
import layout from '../templates/components/crunchy-form';
import { or } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,

  tagName: 'form',
  classNames: [ 'crunchy-form' ],

  model: null,

  didSubmit: false,

  onSubmit() {},
  onCancel() {},

  submitTask: task(function*() {
    this.set('didSubmit', true);
    yield this.onSubmit();
  }),

  cancelTask: task(function*() {
    if (this.model && typeof this.model.rollbackAttributes === 'function') {
      this.model.rollbackAttributes();
    }
    yield this.onCancel();
  }),

  isSubmitting: or('submitTask.isRunning', 'cancelTask.isRunning'),

  submit(e) {
    e.preventDefault();
    this.submitTask.perform();
  },

});
