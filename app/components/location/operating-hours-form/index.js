import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class LocationOperatingHoursFormComponent extends Component {
  @service store;
  @tracked isEditing;

  get hours() {
    return (this.args.location.hasMany('operatingHours').value() || []).toArray();
  }

  @action
  editHours() {
    if (isEmpty(this.hours)) {
      this.createNewHours();
    }
    if (this.hours.filterBy('isDeleted').length === this.hours.length) {
      this.hours.invoke('rollbackAttributes');
    }
    this.isEditing = true;
  }

  @action
  deleteHours() {
    this.hours.invoke('deleteRecord');
    this.isEditing = false;
  }

  createNewHours() {
    for (let i = 0; i < 7; i++) {
      let location = this.args.location;
      let operatingHour = this.store.createRecord('operatingHour', {
        dayOfWeek: i,
        location,
        openTime: '00:00',
        closeTime: '00:00',
        closed: false
      });
      location.operatingHours.pushObject(operatingHour);
    }
  }
}
