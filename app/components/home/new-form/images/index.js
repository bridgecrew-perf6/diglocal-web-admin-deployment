import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class HomeNewFormImagesComponent extends Component {
  @service ajax;
  @service store;

  @tracked showEventFields = false;

  assets = [];

  @action
  onFileUploadComplete(details) {
    let asset = this.store.createRecord('digitalAsset', {
      bucket: details.metadata.bucket,
      filename: details.metadata.name,
      fullPath: details.metadata.fullPath,
      size: details.metadata.size,
      contentType: details.metadata.contentType,
      raw: details.metadata
    });
    this.assets.addObject(asset);
  }

  @action
  async onAllFilesUploadComplete() {
    for (let asset of this.assets) {
      asset.downloadUrls = (await this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(asset.raw, { sizes: ['256_outside'] })
      }
    })).result.downloadURLs;
      await asset.save();
      this.args.model.digitalAssets.addObject(asset);
    }
    this.args.model.save();
  }
}
