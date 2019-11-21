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
      switch(id.substr(0,2)) {
        case '10':
          let day = parseInt(id.substr(4,3), 10);
          return moment().dayOfYear(day).format('ll');
        break;
        case '20':
          let week = parseInt(id.substr(5,2), 10) + 1;
          return `Week of ${moment().week(week).startOf('week').format('ll')}`;
        break;
        case '30':
          let month = parseInt(id.substr(5,2), 10) - 1;
          return `Month of ${moment().month(month).startOf('month').format('ll')}`;
        break;

      }
    }
  })
});
