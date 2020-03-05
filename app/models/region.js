import Model, { attr, hasMany } from '@ember-data/model';

export default class Region extends Model {
  @attr() name;
  @attr() longName;
  @attr() timeZone;
  @attr() defaultCity;
  @attr() defaultState;
  @attr() defaultZip;

  /*************************
  **  Relationships       **
  *************************/

  @hasMany('business') businesses;
  @hasMany('category') categories;

  /*************************
  ** Computed Properties  **
  *************************/
  get momentTz() {
    switch(this.timeZone) {
      case 'Eastern Time (US & Canada)':
        return 'America/New_York';
      case 'Pacific Time (US & Canada)':
        return 'America/Los_Angeles';
      default:
        return null;
    }
  }
}
