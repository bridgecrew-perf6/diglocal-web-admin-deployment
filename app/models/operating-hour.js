import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  closed: attr(),
  closeTime: attr(),
  dayOfWeek: attr(),
  openTime: attr(),

  location: belongsTo('location')
});
