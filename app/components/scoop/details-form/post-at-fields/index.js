import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
// import moment from 'moment';

export default class ScoopDetailsFormPostAtFieldsComponent extends Component {
  daysOfWeekOptions = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  @tracked selectedDays = [];
  @tracked postAtDate;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.model.daysOfWeek)) {
      this.selectedDays = [ ...this.args.model.daysOfWeek ];
    }
    if (isPresent(this.args.model.postAt)) {
      this.postAtDate = this.args.model.postAt;
    } else {
      this.postAtDate = Date.now();
    }
  }

  @action
  selectDay(day, event) {
    event.stopPropagation();
    let { target: { checked } } = event;
    if (checked) {
      this.selectedDays.addObject(day);
    } else {
      this.selectedDays.removeObject(day);
    }
    this.args.didUpdateDays(this.selectedDays);
  }

  @action
  changePostAtDate([ date ]) {
    this.postAtDate = date;
    this.args.model.postAt = this.postAtDate;
  }
}
