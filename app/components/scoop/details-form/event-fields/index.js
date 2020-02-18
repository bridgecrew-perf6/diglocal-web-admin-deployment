import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
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
        this.eventStartTime = formatted;
        this.args.onChangeEventStart(this.eventStartTime);
      }
      if (attr === "end") {
        this.eventEndTime = formatted;
        this.args.onChangeEventEnd(this.eventEndTime);
      }
    }

    @action
    onOpen(attr) {
      if (attr === "start") {
        this.eventStartTime = this.eventStartTime || '00:00:00';
      }
      if (attr === "end") {
        this.eventEndTime = this.eventEndTime || '00:00:00';
      }
    }

    @action
    onClose(attr) {
      if (attr === "start") {
        if (this.eventStartTime && isNone(this.args.model.eventStartTime)) {
          this.args.onChangeEventStart(this.eventStartTime);
        }
      }
      if (attr === "end") {
        if (this.eventEndTime && isNone(this.args.model.eventEndTime)) {
          this.args.onChangeEventEnd(this.eventEndTime);
        }
      }
    }
}
