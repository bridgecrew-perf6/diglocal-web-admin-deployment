import classic from 'ember-classic-decorator';
import { attr, belongsTo } from '@ember-data/model';
import Trackable from './trackable';

@classic
export default class BusinessImage extends Trackable {
  @attr() sizes;
  @attr() url;
  @attr() position;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;
}
