import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-media-object';
import { w } from '@ember/string';

@classic
@templateLayout(layout)
@classNames('crunchy-media-object')
@classNameBindings(
  'flexStyle',
  'isVertical:crunchy-media-object--vertical',
  'isHorizontal:crunchy-media-object--horizontal'
)
export default class CrunchyMediaObject extends Component {
  /**
  * Additional styling (like responsive behavior for horizontal at mobile)
  * should be done via CSS
  */
  get flexStyle() {
    return this.isVertical ?
      'flex flex-col items-center relative' :
      'flex flex-row relative';
  }

  @computed('styles')
  get isVertical() {
    return this.styles.includes('vertical');
  }

  @not('isVertical')
  isHorizontal;

  @tracked style = '';

  @computed('style')
  get styles() {
    return w(this.style);
  }
}
