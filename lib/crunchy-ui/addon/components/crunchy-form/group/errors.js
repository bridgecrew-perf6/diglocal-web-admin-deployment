import classic from 'ember-classic-decorator';
import { classNames, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/errors';

@classic
@templateLayout(layout)
@tagName('span')
@classNames('crunchy-form__group-error')
export default class Errors extends Component {
  model = null;
  field = '';
}
