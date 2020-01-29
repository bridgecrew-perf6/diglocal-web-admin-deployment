import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
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
