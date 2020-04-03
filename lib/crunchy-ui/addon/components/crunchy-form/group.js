import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import { or, readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../templates/components/crunchy-form/group';
import { defineProperty, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

@classic
@templateLayout(layout)
@classNames('crunchy-form__group')
export default class Group extends Component {
  form = null;
  @tracked model = null;
  field = '';

  @computed
  get groupId() {
    return `${guidFor(this)}-control`;
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    defineProperty(this, '_groupValue', readOnly(`model.${this.field}`));
    if (this.field) {
      defineProperty(this, '_groupError', readOnly(`formErrors.${this.field}`));
    }
  }

  @computed('form.{isSubmitting,didSubmit}')
  get formDidSubmit() {
    return this.form && this.form.didSubmit && !this.form.isSubmitting;
  }

  @or('formDidSubmit', '_groupError')
  showError;

  @computed('_groupValue', '_groupError', 'model', 'formDidSubmit')
  get hasError() {
    let isInvalid = false;
    let errors = this.formErrors;
    let field = this.field;

    if (field && errors && errors.get(field)) {
      isInvalid = true;
    }

    return isInvalid && this.showError;
  }
}
