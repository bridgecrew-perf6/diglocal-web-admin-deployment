import { Factory } from 'ember-cli-mirage';
import { underscore } from '@ember/string';
import faker from 'faker';

export default Factory.extend({
  longName(i) { return `${faker.commerce.department()} ${i}` },
  sortOrder: 1,
  metaTitle: 'Asheville’s Best - DigLocal Asheville NC',
  metaDescription: 'DigLocal has your guide to everything local in Asheville',
  metaH1: 'The best of Asheville: Restaurants, Shops, and More',

  afterCreate(model) {
    model.update({
      shortName: underscore(model.longName)
    });
  }
});
