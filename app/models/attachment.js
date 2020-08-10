import { attr, belongsTo } from '@ember-data/model';
import Trackable from './trackable';

export default class Attachment extends Trackable {

  @attr() classification;
  @attr() description;
  @attr() name;
  @attr() tags;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('digitalAsset') digitalAsset;
}
