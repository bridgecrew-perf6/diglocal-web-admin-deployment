import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/image';

export default Component.extend({
  layout,
  classNames: [ 'crunchy-media-object__image-wrapper' ],

  classNameBindings: [
    'isVertical:crunchy-media-object__image-wrapper--vertical',
    'isHorizontal:crunchy-media-object__image-wrapper--horizontal'
  ],
});
