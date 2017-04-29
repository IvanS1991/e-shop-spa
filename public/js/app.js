(function() {

  var sammyApp = Sammy('#content', function() {
    this.get('#/', function(context) {
      context.redirect('#/home');
    });

    this.get('#/home', homeController.all);

    this.get('#/products', productsController.all);
    this.get('#/products/add', productsController.add);
    this.get('#/product/:id', productsController.getById);

    this.get('#/messages', messagesController.all);
    this.get('#/messages/add', messagesController.add);

    this.get('#/profiles', usersController.all);
    this.get('#/users/register', usersController.register);
    this.get('#/users/login', usersController.login);

  });

  $(function() {
    sammyApp.run('#/');
    if (data.users.hasUser()) {
      $('#container-sign-in').addClass('hidden');
      $('#logged-in-as').html("Logged in as " + localStorage.getItem("LOGIN_USERNAME"));
      $('#btn-sign-out').on('click', function(e) {
        e.preventDefault();
        data.users.signOut()
          .then(function() {
            document.location = '#/';
            document.location.reload(true);
          });
      });
    } else {
      $('#container-sign-out').addClass('hidden');
      $('#btn-sign-in').on('click', function(e) {
        e.preventDefault();
        var user = {
          username: $('#tb-username').val(),
          password: $('#tb-password').val()
        };
        data.users.signIn(user)
          .then(function(user) {
            document.location = '#/';
            document.location.reload(true);
          }, function(err) {
            $('#container-sign-in').trigger("reset");
            toastr.error(err.responseText);
          });
      });
    }
  });
}());