import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as sharp from 'sharp';
import { join, dirname } from 'path';
import * as mime from 'mime-types';
import * as request from 'request';
import { runWith } from 'firebase-functions';
import { tmpdir } from 'os';

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '2GB'
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MegaBytes

interface IDownloadResult {
  success: boolean;
  contentType?: string;
  contentLength?: number;
  ext?: string;
  tmpFilePath?: any;
  reason?: string;
};

// @ts-ignore
export const generateThumbnails = runWith(runtimeOpts).https.onCall(async (object) => {
  if (!object.sizes) { return { success: false, reason: 'no_size_provided' }; }

  const fileName = object.name;

  if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
    console.log('exiting function');
    return null;
  }
  // @ts-ignore
  let uuid = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);

  const bucket = admin.storage().bucket(object.bucket);
  const filePath = object.fullPath;
  const bucketDir = dirname(filePath);
  // @ts-ignore
  const workingDir = join(tmpdir(), 'thumbs', uuid());
  const tmpFilePath = join(workingDir, 'source.png');
  const downloadURLs = {};
  const ext = mime.extension(object.contentType);
  const newPath = `${bucketDir}/media.${ext}`;
  await bucket.file(filePath).move(newPath);

  // @ts-ignore
  downloadURLs['original'] = `https://storage.googleapis.com/${object.bucket}/${newPath}`;

  // 1. Ensure thumbnail dir exists
  await fs.ensureDir(workingDir);

  // 2. Download Source File
  await bucket.file(newPath).download({
    destination: tmpFilePath
  });

  // 3. Resize the images and define an array of upload promises
  const sizes = [{
    name: '64_outside',
    options: {
      fit: 'outside',
      width: 64,
      withoutEnlargement: true
    }
  }, {
    name: '128_outside',
    options: {
      fit: 'outside',
      width: 128,
      withoutEnlargement: true
    }
  }, {
    name: '256_outside',
    options: {
      fit: 'outside',
      width: 256,
      withoutEnlargement: true
    }
  }, {
    name: '512_outside',
    options: {
      fit: 'outside',
      width: 512,
      withoutEnlargement: true
    }
  }, {
    name: '1024_outside',
    options: {
      fit: 'outside',
      width: 1024,
      withoutEnlargement: true
    }
  }, {
    name: '2048_outside',
    options: {
      fit: 'outside',
      width: 2048,
      withoutEnlargement: true
    }
  }];

  const uploadPromises = sizes.filter(size => object.sizes.includes(size.name)).map(async size => {
    const thumbName = `thumb@${size.name}_media.${ext}`;
    const thumbPath = join(workingDir, thumbName);
    // @ts-ignore
    downloadURLs[size.name] = `https://storage.googleapis.com/${object.bucket}/${bucketDir}/${thumbName}`;
    // Resize source image
    await sharp(tmpFilePath)
      // @ts-ignore
      .resize(size.options)
      .toFile(thumbPath);
    const fp = join(bucketDir, thumbName);
    // Upload to GCS
    return await bucket.upload(thumbPath, {
      resumable: false,
      destination: fp,
      metadata: { cacheControl: 'public,max-age=31536000' }
    });
  });
  // 4. Run the upload operations
  await Promise.all(uploadPromises);

  // 5. Cleanup remove the tmp/thumbs from the filesystem
  await fs.remove(workingDir);

  return { downloadURLs };
});

// @ts-ignore
export const assetFromUrl = runWith(runtimeOpts).https.onCall(async (object) => {
  const { url, bucket, fullPath } = object;

  // Check the url property for a value
  if (!(url && `${url}`.trim())) {
    return { success: false, reason: 'no_url_provided' };
  }

  // Check the bucket property for a value
  if (!(bucket && `${bucket}`.trim())) {
    return { success: false, reason: 'no_bucket_provided' };
  }

  // Check the fullPath property for a value
  if (!(fullPath && `${fullPath}`.trim())) {
    return { success: false, reason: 'no_fullPath_provided' };
  }

  // @ts-ignore
  let uuid = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);
  const bucketRef = admin.storage().bucket(object.bucket);

  // @ts-ignore
  const workingDir = join(tmpdir(), 'downloads', uuid());

  await fs.ensureDir(workingDir);

  // Define a download function to stream the image into the temp file
  const download = (uri: string): Promise<IDownloadResult> => {
    // Use a promise to allow function to be called with await
    return new Promise((resolve, reject) => {

      // Send HEAD request to get file details
      request.head(uri, (err, res, body) => {
        // Stop on HTTP HEAD request error
        if (err) {
          reject({ success: false, reason: err });
        }

        // Stop if HEAD request returns nothing useful
        if (!(res && res.headers)) {
          reject({ success: false, reason: 'image_not_found' });
        }

        // Capture content type, size
        // @ts-ignore
        const contentType: string = res.headers['content-type'];
        // @ts-ignore
        const contentLength: number = parseInt(res.headers['content-length'], 10);

        // Reject invalid or missing content type
        if (!(contentType && contentType.includes('image'))) {
          reject({ success: false, reason: 'image_not_found' });
        }

        // Reject large files if we can tell they are large
        if (contentLength && contentLength > MAX_FILE_SIZE) {
          reject({ success: false, reason: 'image_too_big' });
        }

        // Compute temp file path with appropriate extension for content type
        // @ts-ignore - ts thinks this should be a bool.
        const ext: string = mime.extension(contentType);
        const tmpFilePath: any = join(workingDir, `download.${ext}`);

        // GET the file; stream to temp file
        request(uri)
          .pipe(fs.createWriteStream(tmpFilePath))
          .on('error', (e) => {
            reject({ success: false, reason: e })
          })
          .on('close', () => {
            const dlResult: IDownloadResult = {
              success: true,
              contentType,
              contentLength,
              ext,
              tmpFilePath
            };

            resolve(dlResult);
          });
      });
    });
  };

  const downloadResult: IDownloadResult = await download(url);

  // Halt on download failure
  if (downloadResult.success === false) {
    return downloadResult;
  }

  // Copy temp file to specified file path
  await bucketRef.upload(downloadResult.tmpFilePath, {
    destination: fullPath,
    metadata: {
      resumable: false,
      cacheControl: 'public,max-age=31536000',
      contentType: downloadResult.contentType
    }
  });

  // Cleanup remove the tmp/thumbs from the filesystem
  await fs.remove(workingDir);

  // Respond with file and bucket details
  return { success: true, url, bucket, fullPath, contentType: downloadResult.contentType };
});
