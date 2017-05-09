import Sammy from "sammy";
import "jquery-ui";
import toastr from "toastr";
import {templates} from "templates";
import {data} from "data";
import {homeController} from "homeController";
import {usersController} from "usersController";
import {productsController} from "productsController";
import {messagesController} from "messagesController";
import {cartController} from "cartController";

(function() {

  var sammyApp = Sammy('#content', function() {
    this.get('#/', function(context) {
      context.redirect('#/home');
    });

    this.get('#/home', homeController.all);

    this.get('#/products', productsController.all);
    this.get('#/products/add', productsController.add);
    this.get('#/products/manage', productsController.manage);
    this.get('#/products/manage/delete', productsController.delete);
    this.get('#/products/manage/edit', productsController.edit);
    
    this.get('#/products/cart', cartController.show);
    this.get('#/products/cart/checkout', cartController.checkout);

    this.get('#/messages/add', messagesController.add);
    this.get('#/messages/delete', messagesController.delete);
    this.get('#/messages/sent', messagesController.checkSent);
    this.get('#/messages/received', messagesController.checkReceived);

    this.get('#/profiles', usersController.all);
    this.get('#/profile', usersController.getProfile);
    this.get('#/users/register', usersController.register);
    this.get('#/users/login', usersController.login);

  });

  $(function() {
    $(document).tooltip();

    sammyApp.run('#/');

    let loggedIn = function() {
      if (localStorage.getItem("LOGIN_AUTHKEY")) {
        $(".logged-in-menu").removeClass("hidden");
      } else {
        $(".logged-in-menu").addClass("hidden");
      }

      templates.get("logged-in-as")
        .then(function(template) {
          $("#logged-in-as").html(template(localStorage));

          $("#btn-sign-out").on("click", function() {
            data.users.signOut()
              .then(function() {
                location.hash = "#/";
              });
          });
        });
    };

    loggedIn();
    $(window).on("hashchange", loggedIn);
  });
}());