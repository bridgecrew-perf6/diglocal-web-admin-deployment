import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames        : [ 'draggable-dropzone' ],
  classNameBindings : [ 'dragClass' ],
  dragClass         : 'deactivated',

  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', 'deactivated');
  },

  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', 'activated');
  },

  drop(event) {
    let data = event.dataTransfer.files;
    get(this, 'dropped')(data);
    set(this, 'dragClass', 'deactivated');
    return false;
  }
});