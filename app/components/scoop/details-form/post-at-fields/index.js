import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import moment from 'moment';

const momentFormat = 'YYYY-MM-DDTHH:mm:ss.SSSSZ';

export default class ScoopDetailsFormPostAtFieldsComponent extends Component {
  @service regions;

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
  @tracked displayFromDate;
  @tracked displayToDate;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.model.daysOfWeek)) {
      this.selectedDays = [ ...this.args.model.daysOfWeek ];
    }
    if (isPresent(this.args.model.postAt)) {
      this.postAtDate = this.args.model.postAt;
    } else {
      this.postAtDate = Date.now();
      if (this.args.isNewForm) {
        this.args.model.postAt = moment.tz(this.postAtDate, this.activeRegionTimeZone).format(momentFormat);
      }
    }
    if (isPresent(this.args.model.recurringDisplayFrom)) {
      this.displayFromDate = this.args.model.recurringDisplayFrom;
    } else {
      this.displayFromDate = Date.now();
    }
    if (isPresent(this.args.model.recurringDisplayTo)) {
      this.displayToDate = this.args.model.recurringDisplayTo;
    } else {
      this.displayToDate = Date.now();
    }
  }

  get activeRegionTimeZone() {
    return this.regions.activeRegion.momentTz;
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
  changePostAtDate(range, formatted) {
    this.postAtDate = moment.tz(formatted, this.activeRegionTimeZone).format(momentFormat);
    this.args.model.postAt = this.postAtDate;
  }

  @action
  changeDisplayTo(range, formatted) {
    this.displayToDate = moment.tz(formatted, this.activeRegionTimeZone).format(momentFormat);
    this.args.model.recurringDisplayTo = this.displayToDate;
  }

  @action
  changeDisplayFrom(range, formatted) {
    this.displayFromDate = moment.tz(formatted, this.activeRegionTimeZone).format(momentFormat);
    this.args.model.recurringDisplayFrom = this.displayFromDate;
  }

  @action
  changeRecurring(value) {
    this.args.model.isRecurring = value;
    if (value) {
      this.args.model.recurringDisplayFrom = moment.tz(this.displayFromDate, this.activeRegionTimeZone).format(momentFormat);
      this.args.model.recurringDisplayTo = moment.tz(this.displayToDate, this.activeRegionTimeZone).format(momentFormat);
      this.args.model.postAt = null;
    } else {
      this.args.model.recurringDisplayFrom = null;
      this.args.model.recurringDisplayTo = null;
      this.args.didUpdateDays([]);
      this.args.model.postAt = this.postAtDate;
    }
  }
}
