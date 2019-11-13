import Component from '@ember/component';
import { computed } from '@ember/object';
import  { equal } from '@ember/object/computed';
import layout from '../templates/components/crunchy-chip';
/**
*  Standalone:
*
* <CrunchyChip
*   @tagName="li"
*   @label="My cool value"
*   @style="light"
*   @color="blue"
*   @allowClear={{true}}
*   @onClear={{action "myAction"}} />
*
*
* Block form:
*
* <CrunchyChip
*   @tagName="li"
*   @style="light"
*   @color="blue"
*   @allowClear={{true}}
*   @onClear={{action "myAction"}}>
*   {{yield}}
* </CrunchyChip>
*/
export default Component.extend({
  layout,

  // For aria purposes, it is best to pass
  // the tagName as 'li' and place inside an 'ul'
  // with aria-label describing the list contents
  // that this chip represents.
  // However, for flexibility, the default is 'span'
  tagName: 'span',

  classNames: [
    'crunchy-chip',
    'mx-1 inline py-1 px-2 rounded leading-loose rounded text-xs'
  ],

  classNameBindings: [
    'lightClass',
    'darkClass'
  ],

  style: 'light',
  color: 'gray',
  label: '',

  allowClear: false,
  onClear() {},

  isLight: equal('style', 'light'),
  isDark: equal('style', 'dark'),

  lightClass: computed('isLight', 'color', function() {
    return this.isLight ? `text-${this.color}-800 bg-${this.color}-200 font-semibold` : '';
  }),

  darkClass: computed('isDark', 'color', function() {
    return this.isDark ? `text-white bg-${this.color}-700 font-bold` : '';
  }),

  buttonClass: computed('style', 'color', function() {
    return this.isDark ? `text-${this.color}-400 hover:text-white` : `text-${this.color}-500 hover:text-${this.color}-800`;
  }),

  actions: {
    didClear() {
      this.onClear();
    }
  }
});
