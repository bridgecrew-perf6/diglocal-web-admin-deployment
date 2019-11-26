import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  shortName: attr(),
  longName: attr(),
  scoopBoost: attr(),
  sortOrder: attr(),
  metaTitle: attr(),
  metaDescription: attr(),
  metaH1: attr(),

  region: belongsTo('region')
});
