import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/control';

@classic
@templateLayout(layout)
@classNames('crunchy-form__group-control')
@classNameBindings('hasError:crunchy-form__group-control--invalid')
export default class Control extends Component {
  groupId = null;

  @oneWay('groupId')
  controlId;
}
