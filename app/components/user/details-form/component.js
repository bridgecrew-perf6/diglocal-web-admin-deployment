import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
@classNames('border rounded p-4')
@classNameBindings('isEditing:bg-gray-100')
export default class DetailsForm extends Component {
  @service store;

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
    this.router.transitionTo('authenticated.region.users');
  }
}
