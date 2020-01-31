import Model, { attr } from '@ember-data/model';

export default class TrackableModel extends Model {
  @attr() deletedAt;
  @attr() createdAt;
  @attr() createdBy;
  @attr() updatedAt;
  @attr() updatedBy;
}
