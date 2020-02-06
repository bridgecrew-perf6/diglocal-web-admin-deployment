import classic from 'ember-classic-decorator';
import FirebaseSessionStore from 'emberfire/session-stores/firebase';

@classic
class ApplicationSessionStore extends FirebaseSessionStore {}

export default ApplicationSessionStore;
