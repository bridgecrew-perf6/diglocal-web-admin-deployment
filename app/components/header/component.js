import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('header')
@classNames('header')
export default class Header extends Component {
  @service session;

  onLogout() {}

  @action
  logout() {
    this.onLogout();
  }
}
