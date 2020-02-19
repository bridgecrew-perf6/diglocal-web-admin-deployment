import { attr, belongsTo } from '@ember-data/model';
import Trackable from './trackable';

export default class Scoop extends Trackable {
  @attr() active;
  @attr() description;
  @attr() eventDate;
  @attr('hh-mm-ss') eventEndTime;
  @attr('hh-mm-ss') eventStartTime;
  @attr() fineText;
  @attr() image;
  @attr() imageThumb;
  @attr() isDeal;
  @attr('boolean', { defaultValue: false }) isRecurring;
  @attr() daysOfWeek;
  @attr() paidRank;
  @attr('date') postAt;
  @attr() ticketUrl;


  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
}
