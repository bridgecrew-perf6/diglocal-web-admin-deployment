import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/submit';

@classic
@templateLayout(layout)
export default class Submit extends Component {}
