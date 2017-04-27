var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_PASSWORD_KEY = 'signed-in-user-password',
    LOCAL_STORAGE_AUTH_KEY= 'signed-in-user-auth-key';


  /* Users */

  function register(user) {
    var reqUser = {
      username: user.username,
      password: user.password,
    };

    return jsonRequester.post('/api/users', {
        data: reqUser
      })
      .then(function(resp) {
        var user = resp.result;
    
  
        return {
          username: resp.result.username
        };
      });
  }

  function signIn(user) {
    var reqUser = {
      username: user.username,
      password: user.password
    };

    var options = {
      data: reqUser
    };

    return jsonRequester.put('/api/users/auth/', options)
      .then(function(resp) {
        var user = resp.result;
     localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, user);
        return user;
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
    return jsonRequester.get('/api/users')
      .then(function(res) {
        return res.result;
      });
  }

/*Products*/

  function productsAdd(product) {
     var user=getCurrent();
   var options = {
      data: {product, user},
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
    return jsonRequester.get('api/products/'+id, options)
      .then(function(res) {
        return res.result;
      });
  }
  function messagesAdd(message) {
     var user=getCurrent();
   var options = {
      data: {message, user},
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
      signIn:signIn,
      signOut:signOut,
      register:register,
      hasUser: hasUser,
      get: usersGet 
    },
    products:{
      add:productsAdd,
      get:productsGet,
      getById:productsGetById
    },
    messages:{
      add:messagesAdd,
      get:messagesGet
    }
   
  };
}());
