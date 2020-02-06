import Model, { attr, belongsTo } from '@ember-data/model';

export default class Category extends Model {
  @attr() shortName;
  @attr() longName;
  @attr() scoopBoost;
  @attr() sortOrder;
  @attr() metaTitle;
  @attr() metaDescription;
  @attr() metaH1;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('region') region;
}
