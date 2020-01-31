import { action } from '@ember/object';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

@classNames('border rounded p-4')
@classNameBindings('isEditing:bg-gray-100')
export default class DetailsForm extends Component {
  @tracked isEditing = false;
  @tracked showDestroyModal = false;

  @not('isEditing') isReadonly;

  rollbackModel() {
    if (this.args.model && this.args.model.get('hasDirtyAttributes')) {
      this.args.model.rollbackAttributes();
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.showDestroyModal = false;
    this.isEditing = false;
    super.willDestroy(...arguments);
  }

  @action
  save() {
    this.args.model.save();
    this.isEditing = false;
  }

  @action
  cancel() {
    this.rollbackModel();
    this.isEditing = false;
  }

  @action
  delete() {
    this.args.model.deleteRecord();
    this.args.model.save();
    this.router.transitionTo('authenticated.businesses');
  }
}
