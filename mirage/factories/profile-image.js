import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  url: faker.internet.avatar(),
  position: 'portrait',

  afterCreate(model) {
    let url = model.url;
    model.update({
      sizes: {
        large: url,
        max: url,
        medium: url,
        mobile: url
      }
    });
  }
});
