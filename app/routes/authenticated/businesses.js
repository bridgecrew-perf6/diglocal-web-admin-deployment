import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class BusinessesRoute extends Route.extend() {
  breadCrumb = null;
}
