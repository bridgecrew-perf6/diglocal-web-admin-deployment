import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-modal/body';

@classic
@templateLayout(layout)
@classNames('crunchy-modal__body')
export default class Body extends Component {}
