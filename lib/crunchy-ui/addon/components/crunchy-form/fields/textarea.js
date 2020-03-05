import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/fields/textarea';
import { defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  layout,

  form: null,
  model: null,
  field: '',
  autocomplete: 'on',

  rows: '10',

  disabled: false,

  didReceiveAttrs() {
    this._super(...arguments);
    defineProperty(this, 'value', alias(`model.${this.field}`));
  },
});
