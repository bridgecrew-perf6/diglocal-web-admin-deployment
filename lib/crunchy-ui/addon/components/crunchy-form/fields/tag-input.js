import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/fields/tag-input';
import { get } from '@ember/object';
import { A, isArray } from '@ember/array';

/*
*  IMPORTANT! THIS ONLY WORKS FOR ARRAYS OF STRINGS
*  Use `crunchy-form/field` in block form and pass
*  'tag-input` component directly to work with arrays of objects
*/

export default Component.extend({
  layout,

  onUpdate() {},

  actions: {
    addTag(tag) {
      let tags = get(this, 'tags');

      if (!isArray(tags)) {
        tags = A();
      }

      tags = tags.slice(0);
      tags.pushObject(tag);
      get(this, 'onUpdate')(tags);
    },

    removeTagAtIndex(index) {
      let tags = get(this, 'tags');

      if (!isArray(tags)) {
        tags = A();
      }

      tags = tags.slice(0);
      tags.removeAt(index);
      get(this, 'onUpdate')(tags);
    }
  }
});
