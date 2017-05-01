var usersController = function() {

  function all(context) {
    var users;
    data.users.get()
      .then(function(resUsers) {
        users = resUsers;
        return templates.get('users');
      })
      .then(function(template) {
        context.$element().html(template(users));
      });
  }

  function register(context) {
    templates.get('register')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-register').on('click', function() {
          var user = {
            username: $('#tb-reg-username').val(),
            password: $('#tb-reg-pass').val()
          };

          data.users.register(user)
            .then(function() {
              document.location = '#/';
              document.location.reload(true);
            });
        });
      });
  }

  function login(context) {
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
            document.location = '#/';
            document.location.reload(true);
  });
});
});
}
  return {
    all: all,
    register: register,
    login: login
  };
}();