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

  get priceTermsOptions() {
    return [
      'Month',
      'Week',
      'Night',
      'Purchase'
    ];
  }

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    location: yup.object().test(
      'has-location',
      'Location is a required field',
      value => isPresent(value.content || value.id)
    ),
    title: yup.string().required().max(100).label('Title'),
    description: yup.string().required().label('Description'),
    // subTitle: yup.string().required().max(100).label('Subtitle')
  });
}
