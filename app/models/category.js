import Model, { attr } from '@ember-data/model';

export default Model.extend({
  regionId: attr(),
  shortName: attr(),
  longName: attr(),
  scoopBoost: attr(),
  sortOrder: attr(),
  metaTitle: attr(),
  metaDescription: attr(),
  metaH1: attr()
});
