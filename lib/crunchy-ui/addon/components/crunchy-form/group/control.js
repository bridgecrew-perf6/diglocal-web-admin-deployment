import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/control';
import { oneWay } from '@ember/object/computed';

export default Component.extend({
  layout,
  groupId: null,
  controlId: oneWay('groupId'),
  classNames: [ 'crunchy-form__group-control' ],
  classNameBindings: [ 'hasError:crunchy-form__group-control--invalid' ]
});
