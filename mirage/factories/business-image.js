import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  url() { return 'https://d2n2b9suk51lyo.cloudfront.net/uploads/business_image/image/10974/fake-business-1580358892.jpg' },
  position: 1,

  afterCreate(model) {
    let url = model.url;
    model.update({
      sizes: {
        medium: url,
        large: url,
        max: url,
        smallx1: url,
        smallx2: url,
        smallx3: url,
        smallx4: url,
        mobile: url
      }
    });
  }
});
