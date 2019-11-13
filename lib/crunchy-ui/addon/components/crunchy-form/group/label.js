import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/label';

export default Component.extend({
  layout,
  tagName: 'label',
  attributeBindings: [ 'for' ],
  classNames: [ 'crunchy-form__group-label' ],
  classNameBindings: [ 'hasError:crunchy-form__group-label--invalid' ]
});
