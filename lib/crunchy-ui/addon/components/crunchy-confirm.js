import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { or } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/crunchy-confirm';
import { task } from 'ember-concurrency';
import { get, set, setProperties, action } from '@ember/object';

/*
  Confirm action alert:
      <CrunchyConfirm
        @onConfirm={{this.confirmAction}}
        @onCancel={{this.cancelAction}}
      >
      </CrunchyConfirm>
*/

@classic
@templateLayout(layout)
export default class CrunchyConfirm extends Component {
  show = false;
  didConfirm = false;
  allowClose = true;
  showCancel = true;
  confirmText = 'Confirm';
  cancelText = 'Cancel';
  disabled = false;

  @or('disabled', 'confirmTask.isRunning')
  isDisabled;

  onConfirm() {}
  onCancel() {}

  @task(function*() {
    set(this, 'didConfirm', true);
    yield get(this, 'onConfirm')();
  })
  confirmTask;

  @action
  confirm() {
    get(this, 'confirmTask').perform();
  }

  @action
  cancel() {
    get(this, 'onCancel')();
    setProperties(this, {
      show: false,
      didConfirm: false
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    set(this, 'didConfirm', false);
  }
}
