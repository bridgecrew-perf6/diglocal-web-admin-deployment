import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  url() { return faker.internet.avatar() },
  position: 'portrait',

  afterCreate(model) {
    let url = model.url;
    model.update({
      sizes: {
        large: url,
        max: url,
        small: url,
        medium: url,
        mobile: url
      }
    });
  }
});
