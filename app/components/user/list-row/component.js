import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class ListRow extends Component {
  isLinkable = true;
}
