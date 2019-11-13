import Component from '@ember/component';
import layout from '../templates/components/crunchy-form';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  layout,

  tagName: 'form',
  classNames: [ 'crunchy-form' ],

  model: null,

  didSubmit: false,

  onSubmit() {},

  submitTask: task(function*() {
    this.set('didSubmit', true);
    yield this.onSubmit();
  }),

  isSubmitting: readOnly('submitTask.isRunning'),

  submit(e) {
    e.preventDefault();
    this.submitTask.perform();
  },

});
