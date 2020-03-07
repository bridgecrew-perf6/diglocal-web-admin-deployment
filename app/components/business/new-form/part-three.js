import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class BusinessNewFormPartThreeComponent extends Component {
  @tracked uploadCompleted = false;

  @task(function*() {
    yield this.args.model.reload();
  })
  onAllFilesUploadComplete;
}
