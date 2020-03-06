import { helper } from '@ember/component/helper';

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
    default:
    display = role;
  }
  return display;
}

export default helper(roleDisplayName);
