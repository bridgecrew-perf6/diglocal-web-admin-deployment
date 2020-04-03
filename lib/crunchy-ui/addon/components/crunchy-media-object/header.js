import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-media-object/header';

@classic
@templateLayout(layout)
@classNames('crunchy-media-object__header')
@classNameBindings(
  'isVertical:crunchy-media-object__header--vertical',
  'isHorizontal:crunchy-media-object__header--horizontal'
)
export default class Header extends Component {}
