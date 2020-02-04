import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { not } from '@ember/object/computed';
import Component from '@ember/component';

@classic
@classNames('border rounded p-4 bg-white')
@classNameBindings('isEditing:bg-white')
export default class Form extends Component {
  isEditing = false;

  @not('isEditing') isReadonly;

  showDestroyModal = false;

  rollbackModel() {
    if (this.model && this.model.get('hasDirtyAttributes')) {
      this.model.rollbackAttributes();
    }
  }

  willDestroyElement() {
    this.rollbackModel();
    this.setProperties({
      showDestroyModal: false,
      isEditing: false
    });
    super.willDestroyElement(...arguments);
  }

  @action
  onReady() {}

  @action
  save() {
    this.model.save();
    this.set('isEditing', false);
  }

  @action
  cancel() {
    this.rollbackModel();
    this.set('isEditing', false);
  }

  @action
  delete() {
    this.model.deleteRecord();
    this.model.save();
  }
}
