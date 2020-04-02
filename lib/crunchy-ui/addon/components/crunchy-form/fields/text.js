import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/fields/text';
import { defineProperty } from '@ember/object';

@classic
@templateLayout(layout)
export default class Text extends Component {
  form = null;
  model = null;
  field = '';
  type = 'text';
  autocomplete = 'on';
  disabled = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    defineProperty(this, 'value', alias(`model.${this.field}`));
  }
}
