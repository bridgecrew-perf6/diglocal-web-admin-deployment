import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('header')
@classNames('header')
export default class Header extends Component {
  @service session;
  @service regions;
}
