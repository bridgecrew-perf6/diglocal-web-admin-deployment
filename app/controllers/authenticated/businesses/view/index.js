import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { task } from 'ember-concurrency';

@classic
export default class AuthenticatedBusinessesViewIndexController extends Controller {
  @service store;
  @service session;

  @(task(function*(/*response*/) {
  }).enqueue())
  onUploadComplete;

  @task(function*() {
    yield this.model.reload();
    set(this, 'showUploadModal', false);
  })
  onAllFilesUploadComplete;

  @action
  cancelUpload() {
    set(this, 'showUploadModal', false);
  }
}
