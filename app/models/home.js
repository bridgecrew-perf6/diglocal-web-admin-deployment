import { attr, belongsTo, hasMany } from '@ember-data/model';
import { isPresent } from '@ember/utils';
import Trackable from './trackable';
import * as yup from 'yup';

export default class Home extends Trackable {
  @attr() active;
  @attr() additionalDetails;
  @attr() address;
  @attr() description;
  @attr() digitalAssetOrder;
  @attr() geoLocation;
  @attr() links;
  @attr() price;
  @attr() priceTerms;
  @attr() subTitle;
  @attr() title;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('location') location;
  @hasMany('digitalAsset') digitalAssets;
  @belongsTo('digitalAsset') avatar;

  /*************************
  ** Computed Properties  **
  *************************/

  get priceTermsOptions() {
    return [
      'Month',
      'Week',
      'Night',
      'Purchase',
      'Coming Soon',
      'Sold'
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
    price: yup.number("Price is not a number").round().integer("Price must be rounded to nearest dollar"),
    // subTitle: yup.string().required().max(100).label('Subtitle')
  });
}
