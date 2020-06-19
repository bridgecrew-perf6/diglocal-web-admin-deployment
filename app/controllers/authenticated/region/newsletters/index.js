import config from 'diglocal-manage/config/environment';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { action, get } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const INPUT_DEBOUNCE = config.environment !== 'test' ? 250 : 0;

export default class AuthenticatedRegionsNewslettersIndexController extends Controller {
  @service store;
  @service router;

  queryParams = [
    'search',
    'sort'
  ];

  sortMenuOptions = {
    email: 'Sort by email',
    fname: 'Sort by first name',
    lname: 'Sort by last name',
    created_at: 'Sort by date subscribed',
  };

  @tracked search = '';
  @oneWay('search') searchString;
  @tracked sort = '-created_at';

  @(task(function* () {
    yield timeout(INPUT_DEBOUNCE);
    this.search = this.searchString;
  }).restartable())
  didSearch;

  @action
  clearSearch() {
    this.search = '';
    this.searchString = '';
  }

  @action
  addFilter(filter, arrayName, event) {
    let { target: { checked } } = event;
    if (checked) {
      this[arrayName].addObject(filter);
    } else {
      this[arrayName].removeObject(filter);
    }
  }

  @action
  removeFilter(filter, arrayName) {
    this[arrayName].removeObject(filter);
  }

  @action
  async removeSubscriber(subscriber) {
    // subscriber is a proxy, so we must use 'get'
    let id = get(subscriber, 'id');
    
    let newsletter = this.store.peekRecord('newsletter', id);
    await newsletter.destroyRecord();
    await this.router.transitionTo('authenticated.region.newsletters');
  }
}

