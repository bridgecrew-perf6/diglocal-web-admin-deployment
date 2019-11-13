import Model, { attr, belongsTo } from '@ember-data/model';
import Trackable from './mixins/trackable';

export default Model.extend(Trackable, {
  image: attr(),
  position: attr(),

  /*************************
  **  Relationships       **
  *************************/

  business: belongsTo('business')
});
