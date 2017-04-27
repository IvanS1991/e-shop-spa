(function() {

  var sammyApp = Sammy('#content', function() {
    this.get('#/', function(context) {
      context.redirect('#/home');
    });

    this.get('#/home', homeForm.all);

    this.get('#/products', productsForm.get);
    this.get('#/products/add', productsForm.add);
    this.get('#/product/:id', productsForm.getById);

    this.get('#/messages', messageForm.get);
    this.get('#/messages/add', messageForm.add);

    this.get('#/users', usersForm.all);
    this.get('#/users/register', usersForm.register);
    this.get('#/profiles', usersForm.all);

  });

  $(function() {
    sammyApp.run('#/');
    /*if (data.users.hasUser()) {
      $('#container-sign-in').addClass('hidden');
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
    }*/
  });
}());
