import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { set } from '@ember/object';

@classic
@classNames('draggable-dropzone')
@classNameBindings('dragClass')
export default class DraggableDropzone extends Component {
  dragClass = 'deactivated';

  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', 'deactivated');
  }

  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', 'activated');
  }

  drop(event) {
    let data = event.dataTransfer.files;
    this.dropped(data);
    set(this, 'dragClass', 'deactivated');
    return false;
  }
}