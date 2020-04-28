import { attr, hasMany, belongsTo } from '@ember-data/model';
import Snapshotable from './snapshotable';
import * as yup from 'yup';

export default class List extends Snapshotable {
  @attr() name;
  @attr() description;
  @attr() items;
  @attr() itemType;
  @attr() followingCount;
  @attr() likesCount;
  @attr('boolean') pinned;
  @attr() heroImage;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('user') user;
  @belongsTo('region') region;
  @hasMany('business') businesses;
  @hasMany('scoop') scoops;

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    name: yup.string().required().label('Name'),
  });
}
