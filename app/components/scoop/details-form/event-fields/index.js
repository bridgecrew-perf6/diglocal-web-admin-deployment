import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ScoopDetailsFormEventFieldsComponent extends Component {
    @service regions;

    @tracked eventDate;
    @tracked eventStartTime;
    @tracked eventEndTime;
    @tracked placeholderDate;

    constructor() {
      super(...arguments);
      let today = moment().format('YYYY-MM-DD');
      this.eventDate =  this.args.model.eventDate || today;
      this.eventStartTime = this.args.model.eventStartTime || null;
      this.eventEndTime = this.args.model.eventEndTime || null;
    }

    get activeRegionTimeZone() {
      return this.regions.activeRegion.momentTz;
    }

    @action
    changeEventDate(range, formatted) {
      this.eventDate = formatted;
      this.args.onChangeEventDate(this.eventDate);
    }

    @action
    changeEventTime(attr, range, formatted) {
      if (attr === "start") {
        this.eventStart = formatted;
        this.args.onChangeEventStart(this.eventStartTime);
      }
      if (attr === "end") {
        this.eventEnd = formatted;
        this.args.onChangeEventEnd(this.eventEndTime);
      }
    }
}
