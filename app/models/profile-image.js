import classic from 'ember-classic-decorator';
import { attr, belongsTo } from '@ember-data/model';
import Trackable from './trackable';

@classic
export default class ProfileImage extends Trackable {
  @attr() position;
  @attr() url;
  @attr() sizes;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('user') user;
}
