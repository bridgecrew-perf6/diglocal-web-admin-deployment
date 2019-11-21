import Model, { attr, belongsTo } from '@ember-data/model';
import { computed, get } from '@ember/object';

export default Model.extend({
  businessApp: attr(),
  businessBrowser: attr(),
  pageViewApp: attr(),
  pageViewBrowser: attr(),
  scoopsApp: attr(),
  scoopsBrowser: attr(),
  visitWebsiteApp: attr(),
  visitWebsiteBrowser: attr(),
  visitTwitterApp: attr(),
  visitTwitterBrowser: attr(),
  visitFacebookApp: attr(),
  visitFacebookBrowser: attr(),
  visitInstagramApp: attr(),
  visitInstagramBrowser: attr(),
  mapClickApp: attr(),
  mapClickBrowser: attr(),
  viewSocialApp: attr(),
  viewSocialBrowser: attr(),
  phoneHotlinkApp: attr(),
  phoneHotlinkBrowser: attr(),
  shareScoopFacebookApp: attr(),
  shareScoopFacebookBrowser: attr(),
  shareScoopTwitterApp: attr(),
  shareScoopTwitterBrowser: attr(),
  shareScoopEmailApp: attr(),
  shareScoopEmailBrowser: attr(),
  clickScoopHotlinkApp: attr(),
  clickScoopHotlinkBrowser: attr(),
  clickScoopMarqueeApp: attr(),
  clickScoopMarqueeBrowser: attr(),
  marqueeScoopImpressionApp: attr(),
  marqueeScoopImpressionBrowser: attr(),

  business: belongsTo('business'),

  formattedDate: computed('id', {
    get() {
      let id = get(this, 'id');
      let span = 0;

      switch(id.substr(0,2)) {
        case '10':
          span = parseInt(id.substr(4,3), 10);
          return moment().dayOfYear(span).format('ll');
        case '20':
          span = parseInt(id.substr(5,2), 10) + 1;
          return `Week of ${moment().week(span).startOf('week').format('ll')}`;
        case '30':
          span = parseInt(id.substr(5,2), 10) - 1;
          return `Month of ${moment().month(span).startOf('month').format('ll')}`;
        default:
          return;
      }
    }
  })
});
