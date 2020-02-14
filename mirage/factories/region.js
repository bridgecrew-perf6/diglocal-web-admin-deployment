import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name(i) { return `region_${i}` },
  longName() { return faker.address.city() },

  withCategories: trait({
    afterCreate(region, server) {
      server.createList('category', 5, { region });
    }
  })
});
