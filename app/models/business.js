import { attr, hasMany, belongsTo } from '@ember-data/model';
import Trackable from './trackable';
import * as yup from 'yup';

export default class Business extends Trackable {
  @attr() description2;
  @attr() description;
  @attr() embedFacebookEnabled;
  @attr() embedInstagramEnabled;
  @attr() embedTwitterEnabled;
  @attr() facebookUrl;
  @attr('boolean', { defaultValue: false }) featured;
  @attr() followersCount;
  @attr() instagramUrl;
  @attr() likesCount;
  @attr() logo;
  @attr() name;
  @attr() numberOfLocations;
  @attr() tip;
  @attr() twitterUrl;
  @attr() website;
  @attr() role;
  @attr('boolean', { defaultValue: false }) active;

  /*
  * deliveryOptions is an object that we never touch directly,
  * we deserialize/serialize the urls into deliveryOptions 
  * in the serializer for business
  */  
  // @attr() deliveryOptions; 
  @attr() grubhubUrl;
  @attr() postmatesUrl;
  @attr() kickbackAvlUrl;
  @attr() takeoutCentralUrl;
  @attr() doordashUrl;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('region') region;
  @hasMany('businessImage') businessImages;
  @hasMany('category') categories;
  @hasMany('location') locations;
  @hasMany('scoop') scoops;
  @hasMany('user') users;

  /*************************
  ** Computed  Properties **
  *************************/

  get displayRole() {
    let role = this.role;
    let display;
    switch(role) {
      case 'premium':
      display = 'Paid Listing';
      break;
      case '2types':
      display = 'Paid Listing with 2 Categories';
      break;
      case 'temporary':
      display = 'Non-Paying (Temporary)';
      break;
      default:
      display = role;
    }
    return display;
  }

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    name: yup.string().required().max(255).label('Name'),
    description: yup.string().nullable().max(255).label('What You Need To Know'),
    description2: yup.string().nullable().max(255).label('What The Locals Say'),
    facebookUrl: yup.string().nullable().url("Facebook link must be a valid URL, starting with 'https://' or 'http://'").label('Facebook URL'),
    twitterUrl: yup.string().nullable().url("Twitter link must be a valid URL, starting with 'https://' or 'http://'").label('Twitter URL'),
    instagramUrl: yup.string().nullable().url("Instagram link must be a valid URL, starting with 'https://' or 'http://'").label('Instagram URL'),
    website: yup.string().nullable().url("Website must be a valid URL, starting with 'https://' or 'http://'").label('Website URL'),
    role: yup.string().required().label("Account Type"),
    grubhubUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Grubhub URL'),
    postmatesUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Postmates URL'),
    kickbackAvlUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Kickback AVL URL'),
    takeoutCentralUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('Takeout Central URL'),
    doordashUrl: yup.string().nullable().url("Link must be a valid URL, starting with 'https://' or 'http://'").label('DoorDash URL'),
    categories: yup.mixed()
      .when('role', {
        is: '2types',
        then: yup.mixed().test(
          'max-categories',
          'No more than 2 categories are allowed for this account level',
          value => value.content && value.content.length <= 2
        ),
        otherwise: yup.mixed().test(
          'max-categories',
          'No more than 1 category is allowed for this account level',
          value => value.content && value.content.length <= 1
        )
      }),
  });
}
