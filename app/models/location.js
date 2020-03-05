import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import * as yup from 'yup';

export default class Location extends Model {
  @attr() address;
  @attr() city;
  @attr() state;
  @attr() zip;
  @attr() phone;
  @attr() title;
  @attr() geocodedLat;
  @attr() geocodedLong;
  @attr() menuUrl;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
  @hasMany('operatingHours') operatingHours;
  @hasMany('scoop') scoops;
  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    zip: yup.string().nullable().matches(/^\d{5}(-?\d{4})?$/, {
      message: 'Postal Code is not valid for the United States',
      excludeEmptyString: false
    }),
    menuUrl: yup.string().nullable().url("Menu URL must be a valid URL, starting with 'https://' or 'http://'"),
  });
}
