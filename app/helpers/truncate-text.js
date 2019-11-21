import { helper } from '@ember/component/helper';

export function truncateText(params, hash) {
  let [ value ] = params;
  let { limit, replace } = hash;
  let text = '';

  if (typeof replace !== 'string') {
    replace = '...';
  }

  if (typeof value === 'string' && value.length > 0) {
    text = value.substr(0, limit);

    if (value.length > limit) {
      text = `${text.trim()}${replace}`;
    }
  }

  return text;
}

export default helper(truncateText);
