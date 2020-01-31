import { Factory, trait } from 'ember-cli-mirage';
import moment from 'moment';
import faker from 'faker';

export default Factory.extend({
  isRecurring: false,
  active: true,
  description(i) { return `${faker.commerce.productAdjective()} Local Scoop ${i + 1}` },
  fineText() { return faker.lorem.sentences() },
  eventDate() { return moment(faker.date.future()).format('YYYY-MM-DD') },
  eventStartTime: '17:00:00',
  eventEndTime: '19:00:00',
  ticketUrl: 'https://www.ticketmaster.com',

  // TODO - what does a recurring scoop look like exactly?
  recurring: trait({
    isRecurring: true,
  }),
});
