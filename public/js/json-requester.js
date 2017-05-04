var jsonRequester = (function() {

  let request = function(method, url, options) {
    options = options || {};

    var headers = options.headers || {},
      data = options.data || undefined;

    var promise = new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        headers: headers,
        data: JSON.stringify(data),
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  class Requester {
    get(url, options) {
      return request('GET', url, options);
    }

    post(url, options) {
      return request('POST', url, options);
    }

    put(url, options) {
      return request('PUT', url, options);
    }

    delete(url, options) {
      return request('DELETE', url, options);
    }
  }

  return new Requester();
}());

export {jsonRequester};