import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  /*************************
  **  Relationships       **
  *************************/

  categories: hasMany('category')
});
