import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class SocialForm extends Component {
  @service store;
  @tracked isEditing = false;

  @not('isEditing') isReadonly;

  constructor() {
    super(...arguments);
    if (isPresent(this.args.isEditing)) {
      this.isEditing = this.args.isEditing
    }
  }

  willDestroy() {
    this.rollbackModel();
    this.isEditing = false;
  }

  rollbackModel() {
    if (this.args.model && this.args.model.get('hasDirtyAttributes')) {
      this.args.model.rollbackAttributes();
    }
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
}
