import Model, { attr, belongsTo } from '@ember-data/model';
import * as yup from 'yup';

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

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    longName: yup.string().required().label('Long Name'),
    shortName: yup.string().required().label('Short Name')
  });
}
