import { attr, belongsTo } from '@ember-data/model';
import { isPresent } from '@ember/utils';
import Trackable from './trackable';
import * as yup from 'yup';

export default class Scoop extends Trackable {
  @attr() active;
  @attr() description;
  @attr() eventDate;
  @attr() eventEndTime;
  @attr() eventStartTime;
  @attr() fineText;
  @attr() image;
  @attr() imageThumb;
  @attr('boolean', { defaultValue: false }) isDeal;
  @attr('boolean', { defaultValue: false }) isRecurring;
  @attr() daysOfWeek;
  @attr() paidRank;
  @attr() postAt;
  @attr() postAtTime;
  @attr() recurringDisplayFrom;
  @attr() recurringDisplayTo;
  @attr() ticketUrl;

  /*************************
  **  Relationships       **
  *************************/

  @belongsTo('business') business;

  /*************************
  **  Validation Schema   **
  *************************/
  validationSchema = yup.object().shape({
    business: yup.object().test(
      'has-business',
      'Business is a required field',
      value => isPresent(value.content || value.id)
    ),
    description: yup.string().required().max(100).label('Description'),
    fineText: yup.string().nullable().max(500).label('Additional Details'),
    ticketUrl: yup.string().nullable().url("Ticket URL must be a valid URL, starting with 'https://' or 'http://'").label('Ticket URL'),
    isRecurring: yup.boolean(),
    daysOfWeek: yup.array().nullable()
    .when('isRecurring', {
      is: true,
      then: yup.array().min(1, 'Must select 1 or more days for weekly recurring scoop')
    }),
  });
}
