import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { not } from '@ember/object/computed';
import Component from '@glimmer/component';

@classNames('border rounded p-4')
@classNameBindings('isEditing:bg-gray-100')
export default class DetailsForm extends Component {
  isEditing = false;

  @not('isEditing') isReadonly;

  showDestroyModal = false;

  rollbackModel() {
    if (this.model && this.model.get('hasDirtyAttributes')) {
      this.model.rollbackAttributes();
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.setProperties({
      showDestroyModal: false,
      isEditing: false
    });
    super.willDestroy(...arguments);
  }

  @action
  save() {
    this.model.save();
    this.isEditing = false;
  }

  @action
  cancel() {
    this.rollbackModel();
    this.isEditing = false;
  }

  @action
  delete() {
    this.model.deleteRecord();
    this.model.save();
    this.router.transitionTo('authenticated.businesses');
  }
}
