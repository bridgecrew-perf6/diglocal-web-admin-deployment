import { isNone } from '@ember/utils';

export default function(key, value) {
  return isNone(value) ?
    `[data-test-id="${key}"]` :
    `[data-test-id="${key}-${value}"]`;
}
