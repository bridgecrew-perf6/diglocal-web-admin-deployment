import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name(i) {
    return `Local Business ${i + 1}`
  },
  description() { return `A local favorite! ${faker.commerce.productAdjective()} Experiences, ${faker.commerce.productAdjective()} Food` },
  description2() { return `The best ${faker.commerce.product()} in town!` },
  followersCount() { return faker.helpers.replaceSymbolWithNumber('3##') },
  likesCount() { return faker.helpers.replaceSymbolWithNumber('1###') },
  tip() { return faker.hacker.phrase() },
  role: 'premium',
  website: 'https://www.google.com',

  withImages: trait({
    afterCreate(business, server) {
      server.create('business-image', { business });
    }
  }),

  withBusinessOwner: trait({
    afterCreate(business, server) {
      server.create('user', {
        businesses: [ business ]
      });
    }
  }),

  withLocation: trait({
    afterCreate(business, server) {
      server.create('location', 'withHours', { business });
      business.update({
        numberOfLocations: 1
      });
    }
  }),

  withCategory: trait({
    afterCreate(business, server) {
      let category = server.create('category');
      business.update({
        categories: [ category ]
      });
    }
  }),

  withScoops: trait({
    afterCreate(business, server) {
      server.createList('scoop', 3, { business });
    }
  }),

  afterCreate(business, server) {
    server.create('impression-tracker', { business });
  }

});
