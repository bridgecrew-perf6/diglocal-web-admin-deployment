import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/body';

@classic
@templateLayout(layout)
@classNames('crunchy-media-object__body')
@classNameBindings(
  'isVertical:crunchy-media-object__body--vertical',
  'isHorizontal:crunchy-media-object__body--horizontal'
)
export default class Body extends Component {}
