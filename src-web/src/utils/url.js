/**
 * 获取和设置地址相关参数
 */
export function getParam(url, param) {
  url = url || '';
  let regexp, result, val;
  regexp = new RegExp(`(\\?|&)${param}=([^&]*)`);
  result = regexp.exec(url);
  val = result && result[2] ? decodeURIComponent(result[2]) : null;
  return val;
}

export function removeParam(url, paramName) {
  url = url || '';
  let arr;
  typeof paramName === 'string' ? (arr[0] = paramName) : arr = paramName;
  for (let i = 0; i < arr.length; i++) {
    let re = new RegExp(`(\\?|&)${arr[i]}=[^&]*?&`);
    let re2 = new RegExp(`(\\?|&)${arr[i]}=?[^&]*?(&|$)`);
    if (re.test(url)) {
      url = url.replace(re, '$1');
    }
    if (re2.test(url)) {
      url = url.replace(re2, '$1');
    }
    let lastChar = url.slice(-1);
    if (lastChar == '&' || lastChar == '?') {
      url = url.slice(0, -1);
    }
  }

  return url;
}

// 一次只能设置一个，不能批量添加
export function setParam(url, paramName, value) {
  url = url || '';
  let re = new RegExp(`(\\?|&)${paramName}=[^&]*`);
  let re2 = new RegExp(`(\\?|&)${paramName}(?=&|$)`);
  let param = `${paramName}=${encodeURIComponent(value)}`;
  if (re.test(url)) {
    return url.replace(re, `$1${param}`);
  }
  if (re2.test(url)) {
    return url.replace(re2, `$1${param}`);
  }
  if (url.indexOf('?') === -1) {
    url += '?';
  }
  let lastChar = url.slice(-1);
  if (lastChar != '&' && lastChar != '?') {
    url += '&';
  }
  return url + param;
}

export default class Url {

  static create(path, params = {}) {
    params = Object.keys(params).reduce((pre, key) => {
      if (typeof params[key] !== 'undefined') {
        pre.push([key, params[key]].join('='));
      }
      return pre;
    }, []).join('&');
    return `${path}?${params}`;
  }

  static getQueryString(name, search = location.search) {
    let reg = new RegExp(`(?:^|\\?|&)${name}=([^&]*)(?:&|$)`, 'i');
    let [, res] = search.match(reg) || [];
    return res && decodeURIComponent(res);
  }


  static setQueryString(map = {}, search = location.search) {
    return Object.keys(map).reduce((res, key) => {
      let reg = new RegExp(`(^|\\?|&)(${key}=)([^&]*)(&|$)`, 'ig');

      if (typeof Url.getQueryString(key, search) !== 'undefined') {
        return res.replace(reg, `$1$2${map[key]}$4`);
      } else {
        return `${res}${res.includes('?') ? '' : '?'}&${key}=${map[key]}`;
      }
    }, search);
  }

}