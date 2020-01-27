import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Trackable from './mixins/trackable';
import { computed } from '@ember/object';

export default Model.extend(Trackable, {
  description2: attr(),
  description: attr(),
  embedFacebookEnabled: attr(),
  embedInstagramEnabled: attr(),
  embedTwitterEnabled: attr(),
  facebookUrl: attr(),
  featured: attr(),
  followersCount: attr(),
  instagramUrl: attr(),
  likesCount: attr(),
  logo: attr(),
  name: attr(),
  numberOfLocations: attr(),
  tip: attr(),
  twitterUrl: attr(),
  website: attr(),
  role: attr(),

  /*************************
  **  Relationships       **
  *************************/

  businessImages: hasMany('businessImage'),
  categories: hasMany('category'),
  locations: hasMany('location'),
  region: belongsTo('region'),
  scoops: hasMany('scoop'),
  users: hasMany('user'),

  /*************************
  ** Computed  Properties **
  *************************/

  displayRole: computed('role', {
    get() {
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
  }),

});
