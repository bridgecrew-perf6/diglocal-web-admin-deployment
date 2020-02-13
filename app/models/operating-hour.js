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

  /*************************
  ** Computed Properties **
  *************************/
  get dayDisplayName() {
    let name = '';
    switch (parseInt(this.dayOfWeek)) {
      case 0:
        name = 'Sunday';
        break;
      case 1:
        name = 'Monday';
        break;
      case 2:
        name = 'Tuesday';
        break;
      case 3:
        name = 'Wednesday';
        break;
      case 4:
        name = 'Thursday';
        break;
      case 5:
        name = 'Friday';
        break;
      case 6:
        name = 'Saturday';
        break;
      default:
        break;
    }
    return name;
  }
}
