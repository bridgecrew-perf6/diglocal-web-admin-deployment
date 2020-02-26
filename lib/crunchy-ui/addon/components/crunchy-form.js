import Component from '@ember/component';
import layout from '../templates/components/crunchy-form';
import { get } from '@ember/object';
import { or } from '@ember/object/computed';
import { task, all, timeout } from 'ember-concurrency';
import { isPresent, isNone } from '@ember/utils';
import ENV from 'diglocal-manage/config/environment';

const TASK_DEBOUNCE = ENV.environment !== 'test' ? 500 : 0;

export default Component.extend({
  layout,

  tagName: 'form',
  classNames: [ 'crunchy-form' ],

  model: null,

  didSubmit: false,
  isReadonly: false,
  debounceSubmit: false,

  onSubmit() {},
  onCancel() {},

  init() {
    this._super(...arguments);

    if (this.isChildForm) {
      this.set('tagName', 'div');
    }
  },

  submitTask: task(function*() {
    this.set('didSubmit', true);

    if (this.skipValidation || isNone(this.model)) {
      return yield this.onSubmit();
    }

    let validations = yield get(this.model, 'validations');

    if (isPresent(validations) && get(validations, 'isInvalid')) {
      return;
    }

    return yield all([
      timeout(TASK_DEBOUNCE),
      this.onSubmit()
    ]);
  }),

  cancelTask: task(function*() {
    if (this.model && typeof this.model.rollbackAttributes === 'function') {
      this.model.rollbackAttributes();
    }
    return yield this.onCancel();
  }),

  isSubmitting: or('submitTask.isRunning', 'cancelTask.isRunning'),

  submit(e) {
    e.preventDefault();
    this.submitTask.perform();
  }
});
