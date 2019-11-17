import Component from '@ember/component';
import layout from '../templates/components/crunchy-confirm';
import { task } from 'ember-concurrency';
import { get, set, setProperties } from '@ember/object';
import { or } from '@ember/object/computed';

/*
  Confirm action alert:
      <Ui::Confirm
        @onConfirm={{action "confirmAction"}}
        @onCancel={{action "cancelAction"}}
      >
      </Ui::Confirm>
*/

export default Component.extend({
  layout,

  show: false,
  didConfirm: false,

  confirmText: 'Confirm',
  cancelText: 'Cancel',

  disabled: false,

  isDisabled: or('disabled', 'confirmTask.isRunning'),

  onConfirm() {},
  onCancel() {},

  confirmTask: task(function*() {
    set(this, 'didConfirm', true);
    yield get(this, 'onConfirm')();
  }),

  actions: {
    confirm() {
      get(this, 'confirmTask').perform();
    },

    cancel() {
      get(this, 'onCancel')();
      setProperties(this, {
        show: false,
        didConfirm: false
      });
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    set(this, 'didConfirm', false);
  }
});
