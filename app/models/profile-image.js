import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  position: attr(),
  url: attr(),
  sizes: attr(),

  user: belongsTo('user')
});