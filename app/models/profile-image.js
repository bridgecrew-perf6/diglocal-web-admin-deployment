import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  position: attr(),
  url: attr(),
  sizes: attr(),

  /*************************
  **  Relationships       **
  *************************/

  user: belongsTo('user')
});