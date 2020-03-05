import Model, { attr, hasMany } from '@ember-data/model';
import * as yup from 'yup';

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
  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    name: yup.string().required().label('Name'),
    longName: yup.string().required().label('Long Name'),
    timeZone: yup.string().required().label('Time Zone'),
    defaultZip: yup.string().nullable().matches(/^\d{5}(-?\d{4})?$/, {
      message: 'Postal Code is not valid for the United States',
      excludeEmptyString: false
    })
  });
}
