import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  active: attr(),
  description: attr(),
  eventDate: attr(),
  eventEndTime: attr(),
  eventStartTime: attr(),
  fineText: attr(),
  image: attr(),
  imageThumb: attr(),
  isRecurring: attr(),
  paidRank: attr(),
  postAt: attr(),
  ticketUrl: attr(),

  /*************************
  **  Relationships       **
  *************************/

  business: belongsTo('business'),
});
