import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Create extends Component {
  @service store;

  @tracked newRecord = null;

  get hasNewRecord() {
    return this.newRecord && !this.newRecord.get('isDeleted');
  }

  @action
  create() {
    let location = this.store.createRecord('location', {
      business: this.args.business
    });

    this.newRecord = location;
  }
}
