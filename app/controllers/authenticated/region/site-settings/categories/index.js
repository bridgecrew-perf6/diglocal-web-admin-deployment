import classic from 'ember-classic-decorator';
import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { set, setProperties, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import config from 'diglocal-manage/config/environment';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

@classic
class AuthenticatedRegionSiteSettingsCategoriesIndexController extends Controller {
  queryParams = [
    'search'
  ];

  search = '';

  @oneWay('search')
  searchString;

  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    set(this, 'search', this.searchString);
  }).restartable())
  didSearch;

  @action
  clearSearch() {
    setProperties(this, {
      search: '',
      searchString: ''
    });
  }
}

export default AuthenticatedRegionSiteSettingsCategoriesIndexController;
