import Model, { attr } from '@ember-data/model';

export default class Newsletter extends Model {
  @attr() email;
  @attr() name;
  @attr() fname;
  @attr() lname;
  @attr() createdAt;

  get fullName() {
    if (!this.name && !this.fname && !this.lname) {
      return 'Unknown'
    }
    if (this.name) {
      return this.name;
    }
    return `${this.fname} ${this.lname}`;
  }
}