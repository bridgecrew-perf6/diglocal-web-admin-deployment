import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  links(model) {
    return {
      first: '',
      previous: '',
      next: '',
      last: ''
    }
  },

  serialize(object, request) {
    console.log(object, request);
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

    if (json.data.length) {
      json.meta = {
        page: {
          total: json.data.length
        }
      };
    }

    return json;
  }
});
