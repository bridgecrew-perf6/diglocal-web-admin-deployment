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
  @attr() isRecurring;
  @attr() paidRank;
  @attr() postAt;
  @attr() ticketUrl;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
}
