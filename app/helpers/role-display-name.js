import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

export function roleDisplayName([ role ]) {
  let display;
  switch(role) {
    case 'premium':
    display = 'Paid Listing';
    break;
    case '2types':
    display = 'Paid Listing with 2 Categories';
    break;
    case 'temporary':
    display = 'Non-Paying (Temporary)';
    break;
    case 'customer':
    display = 'Member';
    break;
    default:
    display = capitalize(role);
  }
  return display;
}

export default helper(roleDisplayName);
