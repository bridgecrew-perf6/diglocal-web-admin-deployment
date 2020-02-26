import { Factory, trait } from 'ember-cli-mirage';
import moment from 'moment';
import faker from 'faker';

export default Factory.extend({
  isRecurring: false,
  isDeal: false,
  active: true,
  description(i) { return `${faker.commerce.productAdjective()} Local Scoop ${i + 1}` },
  fineText() { return faker.lorem.sentences() },
  eventDate() { return moment(faker.date.future()).format('YYYY-MM-DD') },
  postAt() { return moment().format('YYYY-MM-DDTHH:mm:ss.SSSSZ') },

  recurring: trait({
    isRecurring: true,
    daysOfWeek: [0,6], // Sunday, Saturday
    recurringDisplayFrom: '2018-10-23',
    recurringDisplayTo:  '2050-10-23',
    postAt: null,
    eventStartTime: null,
    eventEndTime: null,
    ticketUrl: null
  }),

  eventWithTicketsAndTimes: trait({
    eventStartTime: '17:00:00',
    eventEndTime: '19:00:00',
    ticketUrl: 'https://www.ticketmaster.com'
  })

});
