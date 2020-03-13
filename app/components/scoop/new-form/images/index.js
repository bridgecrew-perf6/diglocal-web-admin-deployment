import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class ScoopNewFormImagesComponent extends Component {
  @task(function*() {
    return yield this.args.model.reload();
  })
  onAllFilesUploadComplete;
}
