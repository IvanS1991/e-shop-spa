var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'LOGIN_USERNAME',
    LOCAL_STORAGE_AUTH_KEY = 'LOGIN_AUTHKEY';

  // U S E R S
  function register(user) {
    validator.user(user);
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.password).toString()
    };

    var options = {
      data: reqUser
    };

    return jsonRequester.post('/api/users', options)
      .then(function(resp) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, resp.authKey);
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, resp.username);
        return resp;
      });
  }

  function signIn(user) {
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.password).toString()
    };

    var options = {
      data: reqUser
    };

    return jsonRequester.put('/api/users', options)
      .then(function(resp) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, resp.authKey);
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, resp.username);
        return resp;
      });
  }

  function signOut() {
    var promise = new Promise(function(resolve, reject) {
      localStorage.clear();
      resolve();
    });
    return promise;
  }

  function hasUser() {
    return !!localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  }

  function getCurrent() {
    return Promise.resolve()
      .then(() => {
        return !!localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      });
  }

  function usersGet() {
    return jsonRequester.get('/api/users');
  }

  // P R O D U C T S
  function productsAdd(product) {
    var user = getCurrent();
    validator.product(product);
    var options = {
      data: {
        product,
        user
      },
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };

    return jsonRequester.post('/api/products', options)
      .then(function(resp) {
        return resp.result;
      });
  }

  function productsGet(query) {
    return jsonRequester.get('/api/products');
  }

  let getForCurrentUser = function() {
    return jsonRequester.get('/api/products', {
      headers: {
        "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    })
  };

  function productsGetByQuery(query) {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };
    return jsonRequester.get('/api/products' + query, options)
      .then(function(res) {
        return res.result;
      });
  }

  let productDelete = function(id) {
    return jsonRequester.delete("/api/products", {
      headers: {
        "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      },
      data: {
        productId: id
      }
    });
  };

  // M E S S A G E S
  function messagesAdd(message) {
    validator.msg(message);
    var options = {
      data: {
        message
      },
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };

    return jsonRequester.post('/api/messages', options);
  }

  let messagesSent = function() {
    let options = {
      headers: {
        "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    }
    return jsonRequester.get("/api/messages/sent", options);
  };

  let messagesReceived = function() {
    let options = {
      headers: {
        "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    }
    return jsonRequester.get("/api/messages/received", options);
  };

  function messagesGetById() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };
    return jsonRequester.get('/api/messages/' +id, options)
      .then(function(res) {
        return res.result;
      });
  }

  let messageDelete = function(id) {
    return jsonRequester.delete("/api/messages", {
      headers: {
        "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      },
      data: {
        msgId: id
      }
    });
  };


  return {
    users: {
      signIn: signIn,
      signOut: signOut,
      register: register,
      hasUser: hasUser,
      get: usersGet
    },
    products: {
      add: productsAdd,
      get: productsGet,
      getForCurrentUser: getForCurrentUser,
      getByQuery: productsGetByQuery,
      delete: productDelete
    },
    messages: {
      add: messagesAdd,
      getSent: messagesSent,
      getReceived: messagesReceived,
      getById: messagesGetById,
      delete: messageDelete
    }
  };
}());