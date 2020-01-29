import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('analytics-table-header', 'w-full')
export default class TableHeader extends Component {}
