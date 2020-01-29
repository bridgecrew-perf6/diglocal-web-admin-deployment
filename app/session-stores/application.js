import classic from 'ember-classic-decorator';
import FirebaseSessionStore from 'emberfire/session-stores/firebase';

@classic
export default class Application extends FirebaseSessionStore {}