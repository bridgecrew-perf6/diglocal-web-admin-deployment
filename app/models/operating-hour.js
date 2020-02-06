import Model, { attr, belongsTo } from '@ember-data/model';

export default class OperatingHour extends Model {
  @attr() closed;
  @attr() closeTime;
  @attr() dayOfWeek;
  @attr() openTime;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('location') location;
}
