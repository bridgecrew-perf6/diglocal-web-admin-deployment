import Component from '@ember/component';
import layout from '../templates/components/crunchy-form';
import EmberObject, { set } from '@ember/object';
import { or } from '@ember/object/computed';
import { task, all, timeout } from 'ember-concurrency';
import { isNone } from '@ember/utils';
import { isArray } from '@ember/array';
import config from 'diglocal-manage/config/environment';

const TASK_DEBOUNCE = config.environment !== 'test' ? 500 : 0;

export default Component.extend({
  layout,

  tagName: 'form',
  classNames: [ 'crunchy-form' ],

  model: null,

  didSubmit: false,
  isReadonly: false,
  debounceSubmit: false,
  formErrors: null,

  onSubmit() {},
  onCancel() {},

  init() {
    this._super(...arguments);

    if (this.isChildForm) {
      set(this, 'tagName', 'div');
    }
    set(this, 'formErrors', EmberObject.create());
  },

  /**
   * A method to validate a single model field against the formSchema
   *
   * @method validateField
   * @param {string} field
   */
  async validateField(field) {
    let noSchema = !this.formSchema;
    let noSchemaForField = noSchema || !(this.formSchema.fields || {}).hasOwnProperty(field);
    if (noSchema || noSchemaForField ) { return; }

    try {
      await this.formSchema.validateAt(field, this.model);
      // set(this.model, field, result);
      this.formErrors.set(field, null);
    } catch(e) {
      this.formErrors.set(field, e);
    }
  },

 /**
  * @method validateForm
  */
  async validateForm() {
    if (!this.formSchema) { return {}; }
    try {
      let result = await this.formSchema.validate(this.model, { abortEarly: false });
      set(this, 'formErrors', EmberObject.create());
      set(this, 'formMessages', []);
      return result;
    } catch(e) {
      set(this, 'formErrors', e.inner.reduce((errors, error) => {
        errors.set(error.path, error);
        return errors;
      }, EmberObject.create()));
      set(this, 'formMessages', e.errors);
      return e;
    }
  },

  submitTask: task(function*() {
    set(this, 'didSubmit', true);

    if (this.skipValidation || isNone(this.model) || isNone(this.formSchema)) {
      return yield all([
        timeout(this.debounceSubmit ? TASK_DEBOUNCE : 0),
        this.onSubmit()
      ]);
    }

    let validated = yield this.validateForm();

    if (validated.name === 'ValidationError' && isArray(validated.errors)) {
      return;
    }

    return yield all([
      timeout(this.debounceSubmit ? TASK_DEBOUNCE : 0),
      this.onSubmit()
    ]);
  }),

  cancelTask: task(function*() {
    set(this, 'didSubmit', false);
    set(this, 'formErrors', EmberObject.create());
    set(this, 'formMessages', []);

    if (this.model && typeof this.model.rollbackAttributes === 'function') {
      this.model.rollbackAttributes();
    }
    return yield this.onCancel();
  }),

  isSubmitting: or('submitTask.isRunning', 'cancelTask.isRunning'),

  submit(e) {
    e.preventDefault();
    this.submitTask.perform();
  },

  actions: {
    async validateField(field) {
      return await this.validateField(field);
    },
    async resetForm() {
      await this.cancelTask.perform();
    }
  }
});
