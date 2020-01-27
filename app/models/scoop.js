import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  description: attr(),
  fineText: attr(),
  imageThumb: attr(),
  eventDate: attr(),
  eventStartTime: attr(),
  eventEndTime: attr(),
  isRecurring: attr(),
  ticketUrl: attr(),
  paidRank: attr(),
  active: attr(),
  postAt: attr(),
  image: attr(),

  /*************************
  **  Relationships       **
  *************************/

  business: belongsTo('business'),
});
