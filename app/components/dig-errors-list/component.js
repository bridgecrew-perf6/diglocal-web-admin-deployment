import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('dig-errors bg-white font-medium')
export default class DigErrorsList extends Component {}
