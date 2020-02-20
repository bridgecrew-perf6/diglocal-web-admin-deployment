import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatEventDate([ eventDate ]/*, hash*/) {
  let formatted;
  try {
    let today = moment().format('YYYY-MM-DD');

    if (moment(today).isSame(eventDate, 'days')) {
      formatted = 'Today';
    } else {
      formatted = moment(eventDate).format('dddd, MMM Do YYYY');
    }
  } catch(e) {
    formatted = '';
  }
  return formatted;
});
