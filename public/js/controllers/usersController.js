import toastr from "toastr";
import "jquery-ui";
import {templates} from "templates";
import {data} from "data";
import {parseQuery} from "parse-query";

var usersController = function() {

  class UsersController {
    all(context) {
      var users;
      data.users.get()
        .then(function(resUsers) {
          resUsers.users.sort((x, y) => x.cash + y.cash);
          users = resUsers;
          return templates.get('users');
        })
        .then(function(template) {
          context.$element().html(template(users));
        });
    }

    getProfile(context) {
      let userId = parseQuery(document.location.href).userId;
      let promise;
      let userData;

      if (userId) {
        promise = data.users.getProfile(userId);
      } else {
        promise = data.users.getCurrentUserProfile();
      }

      promise.then(function(response) {
        userData = response;
        return templates.get("profile-display");
      }, function(error) {
        toastr.error(error.responseText);
        window.history.back();
      })
      .then(function(template) {
        context.$element().html(template(userData));
        
        $(".btn-add-to-cart").on("click", function() {
            console.log("yolo");
            let $that = $(this);
            let id = $that.attr("data-product-id");
            if (!localStorage.SHOPPING_CART) {
              localStorage.setItem("SHOPPING_CART", id);
              toastr.success("Added product to cart!");
            } else if (localStorage.SHOPPING_CART && localStorage.SHOPPING_CART.search(id) < 0) {
              localStorage.SHOPPING_CART += "," + id;
              toastr.success("Added product to cart!");
            } else {
              toastr.error("This product is added to your cart already!");
              return;
            }
        });

        $("#accordion").accordion({
          collapsible: true,
          active: false
        });
      });
    }

    register(context) {
      templates.get('register')
        .then(function(template) {
          context.$element().html(template());

          $('#btn-register').on('click', function() {
            let password = $("#tb-reg-password").val();
            let repeatPassword = $("#tb-reg-password-repeat").val();
            if (password !== repeatPassword) {
              toastr.error("Passwords must match");
              throw new Error("Passwords must match");
            }
            var user = {
              username: $('#tb-reg-username').val(),
              password: $('#tb-reg-password').val()
            };

            data.users.register(user)
              .then(function() {
                window.history.back();
                toastr.success("User registered successfuly");
              }, function(error) {
                toastr.error(error.responseText);
              });
          });
        });
    }

    login(context) {
      templates.get('login')
        .then(function(template) {
          context.$element().html(template());

        $('#btn-sign-in').on('click', function() {

          var user = {
            username: $('#tb-username').val(),
            password: $('#tb-password').val()
          };
          data.users.signIn(user)
            .then(function(user) {
              window.history.back();
              toastr.success("Logged in successfuly!");
            }, function(error) {
              toastr.error(error.responseText);
            });
        });
      });
    }
  }
  
  return new UsersController();
}();

export {usersController};