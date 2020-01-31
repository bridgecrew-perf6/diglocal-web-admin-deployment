import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name(i) { return `region_${i}` },
  longName() { return faker.address.city() }
});
