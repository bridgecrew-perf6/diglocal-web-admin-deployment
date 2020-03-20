import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class SelectBusinessFormComponent extends Component {
  @service('regions') regionsService;
  @service currentUser;

  @tracked selected = null;

  @action
  submit() {
    this.args.onSubmit(this.selected);
  }

  @task(function*() {
    yield this.args.onSubmit(this.selected);
  })
  submit;
}
