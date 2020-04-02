import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../../templates/components/crunchy-form/fields/tag-input';
import { get, action } from '@ember/object';
import { A, isArray } from '@ember/array';

/*
*  IMPORTANT! THIS ONLY WORKS FOR ARRAYS OF STRINGS
*  Use `crunchy-form/field` in block form and pass
*  'tag-input` component directly to work with arrays of objects
*/

@classic
@templateLayout(layout)
export default class TagInput extends Component {
  onUpdate() {}

  @action
  addTag(tag) {
    let tags = get(this, 'tags');

    if (!isArray(tags)) {
      tags = A();
    }

    tags = tags.slice(0);
    tags.pushObject(tag);
    get(this, 'onUpdate')(tags);
  }

  @action
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
