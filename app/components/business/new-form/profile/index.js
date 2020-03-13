import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class BusinessNewFormProfileComponent extends Component {
  @task(function*() {
    return yield this.args.model.reload();
  })
  onAllFilesUploadComplete;
}
