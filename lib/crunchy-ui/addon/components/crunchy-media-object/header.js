import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/header';

export default Component.extend({
  layout,
  classNames: [ 'crunchy-media-object__header' ],
  classNameBindings: [
    'isVertical:crunchy-media-object__header--vertical',
    'isHorizontal:crunchy-media-object__header--horizontal'
  ],
});
