import Component from '@glimmer/component';
import config from 'diglocal-manage/config/environment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class HomeNewFormImagesComponent extends Component {
  @service ajax;
  @service store;

  @action
  async onFileUploadComplete(snapshot) {
    try {
      let asset = await this.createDigitalAssetFromSnapsnot(snapshot);
      // Save the digital asset and add it to the home model,
      // which we will save once all uploads complete (onAllFilesUploadComplete)
      await asset.save();
      this.args.model.digitalAssets.addObject(asset);
    } catch(e) {
      // Throw error for handling by uploader
      throw e;
    }
  }

  @action
  async onAllFilesUploadComplete() {
    try {
      // Save all of the digitalAssets that have been added to the model at once
      await this.args.model.save();
      await this.args.model.hasMany('digitalAssets').reload();
    } catch(e) {
      // Throw error for handling by uploader
      throw e;
    }
  }

  async createDigitalAssetFromSnapsnot(snapshot) {
    let digitalAsset = this.store.createRecord('digitalAsset', {
      bucket: snapshot.metadata.bucket,
      filename: snapshot.metadata.name,
      fullPath: snapshot.metadata.fullPath,
      size: snapshot.metadata.size,
      contentType: snapshot.metadata.contentType,
      raw: snapshot.metadata
    });
    
    return await this.generateThumbnailsForAsset(digitalAsset);
  }

  async generateThumbnailsForAsset(digitalAsset) {
    let thumbnails = await this.ajax.post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(digitalAsset.raw, { sizes: ['256_outside', '512_outside', '1024_outside'] })
      }
    });

    digitalAsset.downloadUrls = thumbnails.result.downloadURLs;
    return digitalAsset;
  }
}
