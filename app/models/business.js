import Model, { attr, hasMany } from '@ember-data/model';
import Trackable from './mixins/trackable';

export default Model.extend(Trackable, {
  description2: attr(),
  description: attr(),
  embedFacebookEnabled: attr(),
  embedInstagramEnabled: attr(),
  embedTwitterEnabled: attr(),
  facebookUrl: attr(),
  followersCount: attr(),
  instagramUrl: attr(),
  likesCount: attr(),
  logo: attr(),
  name: attr(),
  numberOfLocations: attr(),
  tip: attr(),
  twitterUrl: attr(),
  website: attr(),

  /*************************
  **  Relationships       **
  *************************/

  businessImages: hasMany('businessImage'),
  categories: hasMany('category'),
  scoops: hasMany('scoop'),
  locations: hasMany('location'),
  users: hasMany('user')
});
