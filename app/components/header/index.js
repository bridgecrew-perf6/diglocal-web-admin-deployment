import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class Header extends Component {
  @service session;
  @service currentUser;
  @service media;
  @service('regions') regionsService;

  get isMobile() {
    return this.media.isMobile;
  }
}
