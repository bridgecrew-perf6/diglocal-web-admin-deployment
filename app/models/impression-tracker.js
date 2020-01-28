import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';
import { get, computed } from '@ember/object';
import moment from  'moment';

@classic
export default class ImpressionTracker extends Model {
  @attr() businessApp;
  @attr() businessBrowser;
  @attr() pageViewApp;
  @attr() pageViewBrowser;
  @attr() scoopsApp;
  @attr() scoopsBrowser;
  @attr() visitWebsiteApp;
  @attr() visitWebsiteBrowser;
  @attr() visitTwitterApp;
  @attr() visitTwitterBrowser;
  @attr() visitFacebookApp;
  @attr() visitFacebookBrowser;
  @attr() visitInstagramApp;
  @attr() visitInstagramBrowser;
  @attr() mapClickApp;
  @attr() mapClickBrowser;
  @attr() viewSocialApp;
  @attr() viewSocialBrowser;
  @attr() phoneHotlinkApp;
  @attr() phoneHotlinkBrowser;
  @attr() shareScoopFacebookApp;
  @attr() shareScoopFacebookBrowser;
  @attr() shareScoopTwitterApp;
  @attr() shareScoopTwitterBrowser;
  @attr() shareScoopEmailApp;
  @attr() shareScoopEmailBrowser;
  @attr() clickScoopHotlinkApp;
  @attr() clickScoopHotlinkBrowser;
  @attr() clickScoopMarqueeApp;
  @attr() clickScoopMarqueeBrowser;
  @attr() marqueeScoopImpressionApp;
  @attr() marqueeScoopImpressionBrowser;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;

  /*************************
  ** Computed  Properties **
  *************************/

  @computed('id')
  get formattedDate() {
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
}
