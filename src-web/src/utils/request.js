
//如果选择使用axios, 可忽略此文件
import { stringify } from 'qs';
import {fetch} from 'whatwg-fetch';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then((result) => {
    const error = new Error(result.message);
    error.response = response;
    throw error;
  });
}

function getResponseData(res) {
  return new Promise((resolve, reject) => {
    let rejectData = {
      desc: res.api.desc
    }
    if (res.result) {
      rejectData['message'] = res.result.message;
    } else {
      rejectData['message'] = 'api接口请求失败';
    }
    if (res.api && res.api.code == 0) {
      if (res.result && res.result.code == 1) {
        resolve(res.result.data);
      } else {
        reject(rejectData);
      }
    } else {
      reject(rejectData);
    }
  });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(getResponseData);
    // .catch(err => ({ err }));  // 外部catch
}

export function requestOrigin(url, options) {
  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    // .catch(err => ({ err }));  // 外部catch
}


export function requestWithSessionKey(url, options) {
  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  let sessionKeyObj = {};
  if (window.swdLogin && window.swdLogin.sessionKey58) {
    sessionKeyObj['session-key-58'] = window.swdLogin.sessionKey58;
  }
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      ...newOptions.headers,
      ...sessionKeyObj
    };
    newOptions.body = stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    // .catch(err => ({ err }));  // 外部catch
}