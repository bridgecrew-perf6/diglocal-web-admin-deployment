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

    for (let i = 0; i < 7; i++) {
      let operatingHour = this.store.createRecord('operating-hour', {
        dayOfWeek: i,
        location,
        openTime: '09:00:00',
        closeTime: '20:00:00',
        closed: false
      });
      location.operatingHours.pushObject(operatingHour);
    }

    this.newRecord = location;
  }
}
