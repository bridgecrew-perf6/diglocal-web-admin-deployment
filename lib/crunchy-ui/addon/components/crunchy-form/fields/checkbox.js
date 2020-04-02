import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/fields/checkbox';
import { defineProperty } from '@ember/object';

@classic
@templateLayout(layout)
export default class Checkbox extends Component {
  form = null;
  model = null;
  field = '';
  disabled = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    defineProperty(this, 'value', alias(`model.${this.field}`));
  }
}
