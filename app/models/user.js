import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

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
  @attr() hasBusiness;
  
  /*************************
  **  Relationships       **
  *************************/

  @hasMany('business') businesses;
  @hasMany('profileImage') profileImages;

  @computed('isPublic', 'hasProfile')
  get profileStatus() {
    let hasProfile = this.hasProfile;
    if (hasProfile && this.isPublic) {
      return 'Public';
    } else if (hasProfile) {
      return 'Private';
    } else {
      return 'None';
    }
  }

  @computed('givenName', 'publicName', 'user')
  get headerDisplayName() {
    return this.publicName || this.givenName || this.user;
  }
}
