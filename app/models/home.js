import { attr, belongsTo, hasMany } from '@ember-data/model';
import { isPresent } from '@ember/utils';
import Trackable from './trackable';
import * as yup from 'yup';

export default class Home extends Trackable {
  @attr() active;
  @attr() additionalDetails;
  @attr() address;
  @attr() description;
  @attr() links;
  @attr() geoLocation;
  @attr() price;
  @attr() priceTerms;
  @attr() subTitle;
  @attr() title;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('location') location;
  @hasMany('digitalAsset') digitalAssets;

  /*************************
  ** Computed Properties  **
  *************************/

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    // location: yup.object().test(
    //   'has-location',
    //   'Location is a required field',
    //   value => isPresent(value.content || value.id)
    // ),
    description: yup.string().required().label('Description'),
    title: yup.string().required().max(100).label('Title')
  });
}
