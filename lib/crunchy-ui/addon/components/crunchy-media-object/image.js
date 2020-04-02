import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/image';

@classic
@templateLayout(layout)
@classNames('crunchy-media-object__image-wrapper')
@classNameBindings(
  'isVertical:crunchy-media-object__image-wrapper--vertical',
  'isHorizontal:crunchy-media-object__image-wrapper--horizontal'
)
export default class Image extends Component {}
