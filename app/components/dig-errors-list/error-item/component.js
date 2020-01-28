import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('li')
@classNames('dig-errors__item')
export default class ErrorItem extends Component {}
