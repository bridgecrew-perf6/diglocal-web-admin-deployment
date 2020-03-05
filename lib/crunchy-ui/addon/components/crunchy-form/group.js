import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/group';
import { computed, defineProperty } from '@ember/object';
import { readOnly, or } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  layout,

  form: null,
  model: null,
  field: '',
  classNames: [ 'crunchy-form__group' ],

  groupId: computed(function() {
    return `${guidFor(this)}-control`;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    defineProperty(this, '_groupValue', readOnly(`model.${this.field}`));
    if (this.field) {
      defineProperty(this, '_groupError', readOnly(`formErrors.${this.field}`));
    }
  },

  formDidSubmit: computed('form.{isSubmitting,didSubmit}', function() {
    return this.form && this.form.didSubmit && !this.form.isSubmitting;
  }),

  showError: or(
    'formDidSubmit',
    '_groupError'
  ),

  hasError: computed('_groupValue', '_groupError', 'model', 'formDidSubmit', function() {
    let isInvalid = false;
    let errors = this.formErrors;
    let field = this.field;

    if (field && errors && errors.get(field)) {
      isInvalid = true;
    }

    return isInvalid && this.showError;
  }),

});
