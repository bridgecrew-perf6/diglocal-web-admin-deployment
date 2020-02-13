import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocationHoursComponent extends Component {
  @action
  didUpdateTime(attr, range, formatted) {
    this.args.model[attr] = formatted;
  }
}
