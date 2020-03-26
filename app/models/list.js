import { attr, hasMany, belongsTo } from '@ember-data/model';
import Trackable from './trackable';
import * as yup from 'yup';

export default class List extends Trackable {
  @attr() name;
  @attr() description;
  @attr() items;
  @attr() itemType;
  @attr() followingCount;
  @attr() likesCount;
  @attr('boolean') pinned;

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
