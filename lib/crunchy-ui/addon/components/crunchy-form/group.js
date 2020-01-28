import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/group';
import { computed, defineProperty } from '@ember/object';
import { readOnly, or } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  layout,

  form: null,
  model: null,
  didBlur: false,
  field: '',
  classNames: [ 'crunchy-form__group' ],

  groupId: computed(function() {
    return `${guidFor(this)}-control`;
  }),

  didReceiveAttrs() {
    debugger
    this._super(...arguments);
    defineProperty(this, '_groupValue', readOnly(`model.${this.field}`));
  },

  formDidSubmit: computed('form.{isSubmitting,didSubmit}', function() {
    return this.form && this.form.didSubmit && !this.form.isSubmitting;
  }),

  showError: or(
    'formDidSubmit',
    'didBlur'
  ),

  hasError: computed('_groupValue', 'model', 'formDidSubmit', function() {
    let isInvalid = false;
    if (this.model.get('validations')) {
      isInvalid = this.model.get(`validations.attrs.${this.field}.isInvalid`);
    }

    return isInvalid && this.showError;
  }),

});
