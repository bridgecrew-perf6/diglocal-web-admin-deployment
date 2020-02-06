import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

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
}
