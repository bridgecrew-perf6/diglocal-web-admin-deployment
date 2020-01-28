import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class Scoop extends Model {
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
