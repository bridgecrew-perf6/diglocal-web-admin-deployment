import { Factory } from 'ember-cli-mirage';
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
  tip() { return faker.hacker.phrase(); },
  role: 'premium',
  website: 'https://www.google.com',

});
