import classic from 'ember-classic-decorator';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';

@classic
class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {}

export default ApplicationRoute;
