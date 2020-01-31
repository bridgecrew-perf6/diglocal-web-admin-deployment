import { isEmpty } from '@ember/utils';

export default function removeEmpty(obj) {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (!isEmpty(obj[prop])) { newObj[prop] = obj[prop]; }
  });
  return newObj;
}
