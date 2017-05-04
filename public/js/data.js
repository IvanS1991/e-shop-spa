import "crypto-js";
import {jsonRequester} from "json-requester";
import {validator} from "validator";

var data = (function() {
  const LOCAL_STORAGE_USERNAME_KEY = 'LOGIN_USERNAME',
    LOCAL_STORAGE_AUTH_KEY = 'LOGIN_AUTHKEY';
  
  class Users {
    register(user) {
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

    signIn(user) {
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

    signOut() {
      var promise = new Promise(function(resolve, reject) {
        localStorage.clear();
        resolve();
      });
      return promise;
    }

    hasUser() {
      return !!localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    }

    get() {
      return jsonRequester.get('/api/users');
    }
  }
  // U S E R S
  
  class Products {
    add(product) {
      validator.product(product);
      var options = {
        data: {
          product
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

    get(query) {
      return jsonRequester.get('/api/products');
    }

    getForCurrentUser() {
      return jsonRequester.get('/api/products', {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        }
      })
    };

    getByQuery(query) {
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

    getByIds(ids) {
      return jsonRequester.get("/api/products", {
        headers: {
          'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY),
          'x-product-ids': ids
        }
      });
    }

    delete(id) {
      return jsonRequester.delete("/api/products", {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        },
        data: {
          productId: id
        }
      });
    };
  }
  // P R O D U C T S
  
  class Messages {
    add(message) {
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

    getSent() {
      let options = {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        }
      }
      return jsonRequester.get("/api/messages/sent", options);
    };

    getReceived() {
      let options = {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        }
      }
      return jsonRequester.get("/api/messages/received", options);
    };

    delete(id) {
      return jsonRequester.delete("/api/messages", {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        },
        data: {
          msgId: id
        }
      });
    };
  }
  
  class Order {
    checkout(productIds) {
      return jsonRequester.post("/api/orders", {
        headers: {
          "x-auth-key": localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        },
        data: {
          products: productIds
        } 
      });
    }
  }

  return {
    users: new Users(),
    products: new Products(),
    messages: new Messages(),
    order: new Order()
  };
}());

export {data};