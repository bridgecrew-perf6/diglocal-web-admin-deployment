import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Trackable from './mixins/trackable';

@classic
export default class Business extends Model.extend(Trackable) {
  @attr() description2;
  @attr() description;
  @attr() embedFacebookEnabled;
  @attr() embedInstagramEnabled;
  @attr() embedTwitterEnabled;
  @attr() facebookUrl;
  @attr() featured;
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

  @computed('role')
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
}
