import Component from '@ember/component';
import layout from '../templates/components/crunchy-media-object';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { w } from '@ember/string';

export default Component.extend({
  layout,

  classNames: [ 'crunchy-media-object' ],

  classNameBindings: [
    'flexStyle',
    'isVertical:crunchy-media-object--vertical',
    'isHorizontal:crunchy-media-object--horizontal'
  ],

  /**
  * Additional styling (like responsive behavior for horizontal at mobile)
  * should be done via CSS
  */
  flexStyle: computed('isVertical', function() {
    return this.isVertical ?
      'flex flex-col items-center' :
      'flex flex-row';
  }),

  isVertical: computed('styles', function() {
    return this.styles.includes('vertical');
  }),
  isHorizontal: not('isVertical'),

  style: '',

  styles: computed('style', function() {
    return w(this.style);
  }),
});
