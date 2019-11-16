import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/errors';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: [ 'crunchy-form__group-error' ],

  model: null,
  field: '',
});
