import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';
import Trackable from './mixins/trackable';

@classic
export default class BusinessImage extends Model.extend(Trackable) {
  @attr() sizes;
  @attr() url;
  @attr() position;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
}
