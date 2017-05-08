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
      })
      .then(function(template) {
        context.$element().html(template(userData));

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
                context.redirect("#/");
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
              context.redirect("#/");
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