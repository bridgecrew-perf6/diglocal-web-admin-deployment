import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  address: attr(),
  city: attr(),
  state: attr(),
  zip: attr(),
  phone: attr(),
  title: attr(),
  geocoded_lat: attr(),
  geocoded_long: attr(),
  menu_url: attr(),

  /*************************
  **  Relationships       **
  *************************/

  business: belongsTo('business'),
  operatingHours: hasMany('operatingHours'),
  scoops: hasMany('scoop')
});