import Service from '@ember/service';
import config from 'diglocal-manage/config/environment';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Service.extend({
  ajax: service(),
  store: service(),

  handleUploadComplete: task(function*(details, callback) {
    let generatedSizes = ['64_outside', '128_outside', '256_outside', '512_outside', '1024_outside', '2048_outside'];

    /* Generate Thumbnails */
    let { result } = yield get(this, 'ajax').post(`${config.firebase.cloudFunctions}/generateThumbnails`, {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        data: Object.assign(details.metadata, { sizes: generatedSizes })
      }
    });

    // Overwrite FB results with new results.
    details.metadata.downloadURLs = result.downloadURLs;

    const asset = get(this, 'store').createRecord('digitalAsset', {
      bucket: details.metadata.bucket,
      downloadUrls: result.downloadURLs,
      filename: details.metadata.name,
      fullPath: details.metadata.fullPath,
      size: details.metadata.size,
      generatedSizes,
      contentType: details.metadata.contentType,
      raw: details.metadata
    });

    yield asset.save();

    if (typeof callback === 'function') {
      callback(asset);
    }
  })
});
