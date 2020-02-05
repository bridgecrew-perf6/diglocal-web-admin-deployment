import classic from 'ember-classic-decorator';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { action } from '@ember/object';

@classic
export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @action
  error(error/*, transition*/) {
    console.log(error);
   if (error.status === '401') {
     console.log(error);
     this.session.invalidate();
     this.replaceWith('login');
   } else {
     return true;
   }
  }
}
