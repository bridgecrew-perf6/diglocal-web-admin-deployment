import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedRegionBusinessesViewIndexController extends Controller {
  @service store;
  @service session;

  @tracked showUploadModal = false;

  @(task(function*(/*response*/) {
  }).enqueue())
  onUploadComplete;

  @task(function*() {
    yield this.model.reload();
    this.showUploadModal = false;
  })
  onAllFilesUploadComplete;

  @action
  cancelUpload() {
    this.showUploadModal = false;
  }
}
