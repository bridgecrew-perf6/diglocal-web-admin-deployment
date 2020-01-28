import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class ProfileImage extends Model {
  @attr()
  position;

  @attr()
  url;

  @attr()
  sizes;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('user')
  user;
}