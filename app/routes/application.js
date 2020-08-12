import classic from 'ember-classic-decorator';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { getOwner } from '@ember/application';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service currentUser;
  @service firebaseApp;

  async beforeModel() {
    if (this.session.isAuthenticated) {
      return await this._loadCurrentUser();
    }
  }

  async sessionAuthenticated() {
    const attemptedTransition = this.get('session.attemptedTransition');
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    await this._loadCurrentUser();

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.session.attemptedTransition = null;
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else {
      this.transitionTo('/');
    }
  }

  async _loadCurrentUser() {
    try {
      let user = await this.currentUser.load();
      return user;
    } catch(e) {
      let controller = this.controllerFor('application');
      controller.showForbiddenAlert = true;
      this.session.attemptedTransition = null;
    }
  }
}

export default ApplicationRoute;
