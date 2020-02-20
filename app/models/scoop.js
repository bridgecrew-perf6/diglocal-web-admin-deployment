import { attr, belongsTo } from '@ember-data/model';
import Trackable from './trackable';

export default class Scoop extends Trackable {
  @attr() active;
  @attr() description;
  @attr() eventDate;
  @attr() eventEndTime;
  @attr() eventStartTime;
  @attr() fineText;
  @attr() image;
  @attr() imageThumb;
  @attr() isDeal;
  @attr('boolean', { defaultValue: false }) isRecurring;
  @attr() daysOfWeek;
  @attr() paidRank;
  @attr() postAt;
  @attr() postAtTime;
  @attr() recurringDisplayFrom;
  @attr() recurringDisplayTo;
  @attr() ticketUrl;


  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
}
