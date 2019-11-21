import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/body';

export default Component.extend({
  layout,
  classNames: [ 'crunchy-media-object__body' ],
  classNameBindings: [
    'isVertical:crunchy-media-object__body--vertical',
    'isHorizontal:crunchy-media-object__body--horizontal'
  ],
});
