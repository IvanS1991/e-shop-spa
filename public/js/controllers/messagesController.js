var messagesController = (function() {

  function all(context) {
    var messages;
    data.messages.get()
      .then(function(resMess) {
        messages = resMess;
        return templates.get('messages');
      })
      .then(function(template) {
        context.$element().html(template(messages));
      });
  }

  function add(context) {
    templates.get('message-add')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-message-add').on('click', function() {

          var product = {
            title: $('#tb-message-title').val(),
            description: $('#tb-message-description').val(),
            recipient:$('#tb-message-recipient').val()
          };

          data.messages.add(message)
            .then(function(message) {
              toastr.success(`Message successfully send!`);
            });
        });
      });
  }

  return {
    all: all,
    add: add
  };
}());