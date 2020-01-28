import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class OperatingHour extends Model {
  @attr()
  closed;

  @attr()
  closeTime;

  @attr()
  dayOfWeek;

  @attr()
  openTime;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('location')
  location;
}
