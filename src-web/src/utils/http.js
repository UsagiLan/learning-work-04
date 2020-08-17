/**
 * Created by lunachi on 2018/4/19.
 * http 数据请求
 * 支持：get、post、jsonp
 */

import Axios from 'axios'
import Jsonp from 'jsonp'
import Qs from 'qs'

class Http {
  constructor () {
    this.axios = Axios
  }

  get (url, data = {}, config = {}) {
    const _urlObj = this._parseUrl(url)
    const _data = Object.assign({}, _urlObj.query, data)
    const _config = Object.assign({
      withCredentials: true,
      timeout: 3000,
      params: _data
    }, config)

    return this.axios.get(_urlObj.url, _config)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return err
      })
  }

  post (url, data = {}, config = {}) {
    const _config = Object.assign({
      withCredentials: true,
      timeout: 3000,
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }, config)

    return this.axios.post(url, Qs.stringify(data), _config)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return err
      })
  }

  jsonp (url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      const _urlObj = this._parseUrl(url)
      const _data = Object.assign({}, _urlObj.query, data)

      let _url = `${_urlObj.url}${Qs.stringify(_data, {addQueryPrefix: true})}`
      let _config = Object.assign({
        prefix: 'jp',
        param: 'jsoncallback',
        timeout: 3000
      }, config)

      Jsonp(_url, _config, function (err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  _parseUrl (url = '') {
    const _query = (url.match(/(\?.*$)/) || [''])[0]
    const _url = url.replace(_query, '')
    let _data = {}
    if (_query) {
      _data = Qs.parse(_query, {ignoreQueryPrefix: true})
    }
    return {
      url: _url,
      query: _data
    }
  }
}

export default new Http()
