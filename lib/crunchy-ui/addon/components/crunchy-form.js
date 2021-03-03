import Component from '@ember/component';
import layout from '../templates/components/crunchy-form';
import classic from 'ember-classic-decorator';
import { classNames, tagName, layout as templateLayout } from '@ember-decorators/component';
import EmberObject, { set, action, computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { task, all, timeout } from 'ember-concurrency';
import { isNone } from '@ember/utils';
import { isArray } from '@ember/array';
import config from 'diglocal-manage/config/environment';

const TASK_DEBOUNCE = config.environment !== 'test' ? 500 : 0;

@classic
@templateLayout(layout)
@tagName('form')
@classNames('crunchy-form')
export default class CrunchyFormComponent extends Component {
  model = null;

  didSubmit = false;
  isReadonly = false;
  debounceSubmit = false;
  formErrors = EmberObject.create();

  @computed('model', 'model.hasDirtyAttributes')
  get disableSubmit() {
    let isEmberModel = this.model && typeof this.model.rollbackAttributes === 'function';
    let isDirty = isEmberModel && this.model.hasDirtyAttributes;
    return isEmberModel && !isDirty;
  }

  onSubmit() {}
  onCancel() {}

  init() {
    super.init(...arguments);

    if (this.isChildForm) {
      set(this, 'tagName', 'div');
    }
  }

  async _validateField(field) {
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
  }

  async _validateForm() {
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
  }

  @task(function*() {
    set(this, 'didSubmit', true);

    if (this.skipValidation || isNone(this.model) || isNone(this.formSchema)) {
      return yield all([
        timeout(this.debounceSubmit ? TASK_DEBOUNCE : 0),
        this.onSubmit()
      ]);
    }

    let validated = yield this._validateForm();

    if (validated.name === 'ValidationError' && isArray(validated.errors)) {
    // eslint-disable-next-line
      console.error('A validation error occurred:', validated);
      return;
    }

    yield all([
      timeout(this.debounceSubmit ? TASK_DEBOUNCE : 0),
      this.onSubmit()
    ]);

    set(this, 'didSubmit', false);
  })
  submitTask;

  @task(function*() {
    set(this, 'didSubmit', false);
    set(this, 'formErrors', EmberObject.create());
    set(this, 'formMessages', []);

    if (this.model && typeof this.model.rollbackAttributes === 'function') {
      this.model.rollbackAttributes();
    }
    return yield this.onCancel();
  })
  cancelTask;

  @or('submitTask.isRunning', 'cancelTask.isRunning') isSubmitting;

  submit(e) {
    e.preventDefault();
    this.submitTask.perform();
  }

  @action
  async validateField(field) {
    return await this._validateField(field);
  }

  @action
  async resetForm() {
    await this.cancelTask.perform();
  }
}
