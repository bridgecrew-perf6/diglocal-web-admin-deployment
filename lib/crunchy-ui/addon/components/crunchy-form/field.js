import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/field';

/*
*  A block-only component for yielding any input within a form group.
*  This component will NOT handle updating the value, but allows access
*  to form styling, layout, and validation error behavior that comes
*  with 'form/group'
*/

@classic
@templateLayout(layout)
export default class Field extends Component {}
