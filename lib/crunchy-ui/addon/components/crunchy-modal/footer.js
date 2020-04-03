import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-modal/footer';

@classic
@templateLayout(layout)
@classNames('crunchy-modal__footer')
export default class Footer extends Component {}
