import Model, { attr } from '@ember-data/model';

export default class TrackableModel extends Model {
  @attr('date') deletedAt;
  @attr('date') createdAt;
  @attr() createdBy;
  @attr('date') updatedAt;
  @attr() updatedBy;
}
