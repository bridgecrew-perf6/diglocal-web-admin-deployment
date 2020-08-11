import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class HomeNewFormDetailsComponent extends Component {
  @service ajax;
  @service store;

  @tracked showEventFields = false;

  @action
  toggleEventFields(value) {
    this.showEventFields = value;
    if (!value) {
      this.args.model.eventDate = null;
      this.args.model.eventStartTime = null;
      this.args.model.eventEndTime = null;
    }
  }

  @action
  async onFileUploadComplete(details) {
    let asset = this.store.createRecord('digitalAsset', {
      bucket: details.metadata.bucket,
      downloadUrls: details.metadata.downloadURLs,
      filename: details.metadata.name,
      fullPath: details.metadata.fullPath,
      size: details.metadata.size,
      contentType: details.metadata.contentType,
      raw: details.metadata
    });

    this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(details.metadata, { sizes: ['256x256'] })
      }
    });

    await asset.save();
    this.args.model.digitalAssets.addObject(asset);
  }

  @action
  onAllFilesUploadComplete() {
    this.args.model.save();
  }

  @task(function*() {
    return yield this.args.model.reload();
  })
  onAllFilesUploadComplete;

  @action
  updateLocation(placeDetails) {
    this.args.model.geoLocation = [
      placeDetails.geometry.location.lat(),
      placeDetails.geometry.location.lng()
    ];
  }
}
