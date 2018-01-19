import 'isomorphic-fetch'
import qs from 'query-string'

const defaultHeaders = {
  'Accept': 'application/json'
}

const api = (data) => {
  const isObj = Object.prototype.toString.call(data) === '[object Object]'
  const options = isObj ? data : {url: data}
  const url = options.durl || process.env.api + '/api/' + options.url
  const params = options.params ? qs.stringify(options.params) : ''
  const headers = {
    ...defaultHeaders,
    ...(options.headers || {})
  }
  return fetch(url + '?' + params, {headers, ...options})
    .then(res => {
      const contentType = res.headers.get('Content-Type')
      const type = contentType.match(/text|json/)[0]
      const response = res[type || 'text']()
      const status = res.status

      return String(res.status).match(/^(5|4)/)
        ? response.then(data => Promise.reject({data, type, status}))
        : response.then(data => Promise.resolve({data, type, status}))
    })
}

export default api
