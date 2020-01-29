import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, set, action, computed } from '@ember/object';

@classic
export default class Create extends Component {
  @service store;

  @computed('business', 'newRecord.isDeleted')
  get hasNewRecord() {
    return this.newRecord && !this.newRecord.get('isDeleted');
  }

  @action
  create() {
    set(this, 'newRecord', this.store.createRecord('location', {
      business: get(this, 'business')
    }));
  }
}
