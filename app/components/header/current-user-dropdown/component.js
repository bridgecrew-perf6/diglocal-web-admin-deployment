import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderSelectRegionComponent extends Component {
  @service session;
  @service currentUser;

  @action
  logout(dd) {
    dd.actions.close();
    this.session.invalidate();
    this.currentUser.user = null;
  }
}
