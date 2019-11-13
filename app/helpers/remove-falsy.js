import { isEmpty } from '@ember/utils';

export default function removeFalsy(obj) {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (!isEmpty(obj[prop])) { newObj[prop] = obj[prop]; }
  });
  return newObj;
}
