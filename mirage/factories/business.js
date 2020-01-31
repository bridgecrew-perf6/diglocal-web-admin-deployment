import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name(i) {
    return `Local Business ${i + 1}`
  },
  description() { return `A local favorite! ${faker.commerce.productAdjective()} Experiences, ${faker.commerce.productAdjective()} Food` },
  description2() { return `The best ${faker.commerce.product()} in town!` },
  followersCount: '234',
  likesCount: '1023',
  numberOfLocations: '1',
  tip() { return faker.hacker.phrase() },
  role: 'premium',
  website: 'https://www.google.com',

  withImages: trait({
    afterCreate(business, server) {
      server.create('business-image', { business });
    }
  }),

  withLocation: trait({
    afterCreate(business, server) {
      server.create('location', 'withHours', { business });
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
