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

  /*
  * deliveryOptions is an object that we never touch directly,
  * we deserialize/serialize the urls into deliveryOptions 
  * in the serializer for location
  */
  @attr() grubhubUrl;
  @attr() postmatesUrl;
  @attr() kickbackAvlUrl;
  @attr() takeoutCentralUrl;
  @attr() doordashUrl;

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
    grubhubUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Grubhub URL'),
    postmatesUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Postmates URL'),
    kickbackAvlUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Kickback AVL URL'),
    takeoutCentralUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Takeout Central URL'),
    doordashUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('DoorDash URL'),
  });
}
