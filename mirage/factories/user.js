import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  active: true,
  admin: false,
  role: 'user',
  email: faker.internet.exampleEmail(),
  favoritesCount: 15,
  hasProfile: true,
  isPublic: true,
  lastSignInAt: faker.date.recent(),
  signInCount: 234,
  user: faker.internet.userName(),
  givenName: faker.name.firstName(),
  surname: faker.name.lastName(),
  location: 'Asheville, NC',
  timezone: 'Eastern Time (US & Canada)',
  bio: `Lover of all things local. Originally from ${faker.address.state()}. My favorite color is ${faker.commerce.color()}!`,
  headline: faker.name.jobType(),

  // TODO - what is the difference between a business and a customer type user?
  customerUser: trait({
    role: 'customer',
    publicName(i) {
      return `Local Business Customer ${i + 1}`
    },
    headline: `${faker.commerce.productAdjective()} Experiences, ${faker.commerce.productAdjective()} Food`,
    bio: `The best ${faker.commerce.product()} in town! Come visit us for a truly incredible local experience! Ask us about our seasonal deals and discounts.`
  })
})
