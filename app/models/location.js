import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

@classic
export default class Location extends Model {
  @attr()
  address;

  @attr()
  city;

  @attr()
  state;

  @attr()
  zip;

  @attr()
  phone;

  @attr()
  title;

  @attr()
  geocoded_lat;

  @attr()
  geocoded_long;

  @attr()
  menu_url;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business')
  business;

  @hasMany('operatingHours')
  operatingHours;

  @hasMany('scoop')
  scoops;
}