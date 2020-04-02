import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';

import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';

import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-chip';
/**
*  Standalone:
*
* <CrunchyChip
*   @tagName="li"
*   @label="My cool value"
*   @title="My long description of my cool value to appear on hover"
*   @style="light"
*   @color="blue"
*   @allowClear={{true}}
*   @onClear={{this.myAction}} />
*
*
* Block form:
*
* <CrunchyChip
*   @tagName="li"
*   @title="My long description of my cool value to appear on hover"
*   @style="light"
*   @color="blue"
*   @allowClear={{true}}
*   @onClear={{this.myAction}}>
*   {{yield}}
* </CrunchyChip>
*/
@classic
@templateLayout(layout)
@tagName('span')
@classNames('crunchy-chip', 'mx-1 inline py-px px-2 rounded text-xs cursor-default')
@classNameBindings('lightClass', 'darkClass')
@attributeBindings('title')
export default class CrunchyChip extends Component {
  @tracked style = 'light';
  @tracked color = 'gray';
  label = '';
  title = '';
  allowClear = false;
  onClear() {}

  @equal('style', 'light')
  isLight;

  @equal('style', 'dark')
  isDark;

  @computed('isLight', 'color')
  get lightClass() {
    return this.isLight ? `text-${this.color}-800 bg-${this.color}-200 font-semibold` : '';
  }

  @computed('isDark', 'color')
  get darkClass() {
    return this.isDark ? `text-white bg-${this.color}-700 font-bold` : '';
  }

  get buttonClass() {
    return this.isDark ? `text-${this.color}-400 hover:text-white` : `text-${this.color}-500 hover:text-${this.color}-800`;
  }

  @action
  didClear() {
    this.onClear();
  }
}
