import { JSONAPISerializer } from 'ember-cli-mirage';
import { camelize } from '@ember/string';
import buildLinks from '../helpers/build-links';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return camelize(attr);
  },

  keyForRelationship(key) {
    return camelize(key);
  },

  links(model) {
    return buildLinks(model);
  },

  serialize(object/*, request*/) {
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

    if (object.meta && object.meta.total) {
      json.meta = {
        page: {
          total: object.meta.total
        }
      };
    } else if (json.data.length) {
      // Current catch-all hack for playing nice with ember-ella-sparse
      // TODO - implement proper mock-pagination, sort, filter
      json.meta = {
        page: {
          total: json.data.length
        }
      };
    }

    return json;
  }
});
