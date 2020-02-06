import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ListRow extends Component {
  @service('regions') regionsService;
}
