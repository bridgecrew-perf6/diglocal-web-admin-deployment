import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() { return `${faker.address.city()} Location` },
  address() { return faker.address.streetAddress() },
  city: 'Asheville',
  state: 'NC',
  zip: 28803,
  geocodedLat: 35.5661521,
  geocodedLong: -82.5302039,
  phone() { return faker.phone.phoneNumberFormat() },
  menuUrl: 'https://menupages.com/',

  withHours: trait({
    afterCreate(location, server) {
      let hours = [
        server.create('operating-hour', { location, dayOfWeek: 0, closed: true, closeTime: null, openTime: null }),
        server.create('operating-hour', { location, dayOfWeek: 1 }),
        server.create('operating-hour', { location, dayOfWeek: 2 }),
        server.create('operating-hour', { location, dayOfWeek: 3 }),
        server.create('operating-hour', { location, dayOfWeek: 4 }),
        server.create('operating-hour', { location, dayOfWeek: 5 }),
        server.create('operating-hour', { location, dayOfWeek: 6, closed: true, closeTime: null, openTime: null })
      ];
      location.update({
        operatingHours: hours
      })
    }
  }),
})
