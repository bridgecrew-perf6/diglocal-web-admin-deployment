import classic from 'ember-classic-decorator';

import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';

import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/group/label';

@classic
@templateLayout(layout)
@tagName('label')
@attributeBindings('for')
@classNames('crunchy-form__group-label')
@classNameBindings('hasError:crunchy-form__group-label--invalid')
export default class Label extends Component {}
