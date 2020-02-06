import Model, { attr, hasMany } from '@ember-data/model';

export default class Region extends Model {
  @attr() name;
  @attr() longName;

  /*************************
  **  Relationships       **
  *************************/

  @hasMany('business') businesses;
  @hasMany('category') categories;
}
