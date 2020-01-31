import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  closed: false,
  closeTime: '18:00:00',
  openTime: '09:00:00',
  dayOfWeek(i) { return i % 7 }
});
