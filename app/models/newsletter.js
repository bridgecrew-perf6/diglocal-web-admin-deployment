import Model, { attr } from '@ember-data/model';

export default class Newsletter extends Model {
  @attr() email;
  @attr() fname;
  @attr() lname;
  @attr() createdAt;
}