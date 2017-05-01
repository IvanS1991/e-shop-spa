(function() {

  var sammyApp = Sammy('#content', function() {
    this.get('#/', function(context) {
      context.redirect('#/home');
    });

    this.get('#/home', homeController.all);

    this.get('#/products', productsController.all);
    this.get('#/products/add', productsController.add);
    this.get('#/product/:id', productsController.getById);

    this.get('#/messages/add', messagesController.add);
    this.get('#/messages/sent', messagesController.checkSent);
    this.get('#/messages/received', messagesController.checkReceived);

    this.get('#/profiles', usersController.all);
    this.get('#/users/register', usersController.register);
    this.get('#/users/login', usersController.login);

  });

  $(function() {
    sammyApp.run('#/');

    let loggedIn = function() {
      templates.get("logged-in-as")
        .then(function(template) {
          $("#logged-in-as").html(template(localStorage));

          $("#btn-sign-in").on("click", function() {
            var user = {
              username: $('#tb-username').val(),
              password: $('#tb-password').val()
            };
            data.users.signIn(user)
              .then(function(user) {
                document.location.hash = '/';
              }, function(err) {
                $('#container-sign-in').trigger("reset");
                toastr.error(err.responseText);
              });
          });

          $("#btn-sign-out").on("click", function() {
            data.users.signOut()
              .then(function() {
                document.location.hash = "/";
              });
          });
        });
    };

    loggedIn();
    $(window).on("hashchange", loggedIn);
  });
}());