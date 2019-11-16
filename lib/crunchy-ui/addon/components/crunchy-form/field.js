import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/field';

/*
*  A block-only component for yielding any input within a form group.
*  This component will NOT handle updating the value, but allows access
*  to form styling, layout, and validation error behavior that comes
*  with 'form/group'
*/

export default Component.extend({
  layout
});
