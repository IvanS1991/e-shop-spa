var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_PASSWORD_KEY = 'signed-in-user-password',
    LOCAL_STORAGE_AUTH_KEY = 'signed-in-user-auth-key';

  // U S E R S
  function register(user) {
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.password).toString()
    };

    return jsonRequester.post('/api/users', {
        data: reqUser
      })
      .then(function(resp) {
        alert("success");
      }, function(error) {
        alert(error);
      });
  }

  function signIn(user) {
    var reqUser = {
      username: user.username,
      passHash: CryptoJS.SHA1(user.password).toString()
    };

    console.log(reqUser);

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
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
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
    var options = {
      data: {
        product,
        user
      },
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };

    return jsonRequester.post('api/products', options)
      .then(function(resp) {
        return resp.result;
      });
  }

  function productsGet() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY)
      }
    };
    return jsonRequester.get('api/products', options)
      .then(function(res) {
        return res.result;
      });
  }

  function productsGetById(id) {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY)
      }
    };
    return jsonRequester.get('api/products/' + id, options)
      .then(function(res) {
        return res.result;
      });
  }

  // M E S S A G E S
  function messagesAdd(message) {
    var user = getCurrent();
    var options = {
      data: {
        message,
        user
      },
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      }
    };

    return jsonRequester.post('api/messages', options)
      .then(function(resp) {
        return resp.result;
      });
  }

  function messagesGet() {
    var options = {
      headers: {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY)
      }
    };
    return jsonRequester.get('api/messages', options)
      .then(function(res) {
        return res.result;
      });
  }


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
      getById: productsGetById
    },
    messages: {
      add: messagesAdd,
      get: messagesGet
    }
  };
}());