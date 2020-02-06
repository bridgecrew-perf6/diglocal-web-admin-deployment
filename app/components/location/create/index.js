import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { set, action } from '@ember/object';

export default class Create extends Component {
  @service store;

  @tracked newRecord = null;

  get hasNewRecord() {
    return this.newRecord && !this.newRecord.get('isDeleted');
  }

  @action
  create() {
    set(this, 'newRecord', this.store.createRecord('location', {
      business: this.args.business
    }));
  }
}
