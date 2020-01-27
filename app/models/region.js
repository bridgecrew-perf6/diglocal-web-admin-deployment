import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  name: attr(),
  longName: attr(),

  /*************************
  **  Relationships       **
  *************************/

  businesses: hasMany('business'),
  categories: hasMany('category')
});
