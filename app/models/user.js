import classic from 'ember-classic-decorator';
import Model, { attr, hasMany } from '@ember-data/model';
import { get, computed } from '@ember/object';

@classic
export default class User extends Model {
  @attr() active;
  @attr() admin;
  @attr() role;
  @attr() businessName;
  @attr() email;
  @attr() favoritesCount;
  @attr() hasProfile;
  @attr() isPublic;
  @attr() lastSignInAt;
  @attr() phoneNumbers;
  @attr() signInCount;
  @attr() user;
  @attr() publicName;
  @attr() givenName;
  @attr() middleName;
  @attr() surname;
  @attr() nickname;
  @attr() gender;
  @attr() birthdate;
  @attr() birthdateFormat;
  @attr() location;
  @attr() timezone;
  @attr() bio;
  @attr() headline;

  /*************************
  **  Relationships       **
  *************************/

  @hasMany('business') businesses;
  @hasMany('profileImage') profileImages;

  @computed
  get profileStatus() {
    let hasProfile = get(this, 'hasProfile');
    if(hasProfile && get(this, 'isPublic')) {
      return 'Public';
    } else if (hasProfile) {
      return 'Private';
    } else {
      return 'None';
    }
  }
}
