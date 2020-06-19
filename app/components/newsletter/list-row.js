import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NewsletterListRow extends Component {
  @tracked showDestroyModal = false;

  @action
  async unsubscribe(item) {
    return await this.args.removeAction(item);
  }
}
