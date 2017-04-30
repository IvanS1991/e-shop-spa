var messagesController = (function() {

  let menu = function (context) {
    templates.get("messages")
      .then(function(template) {
        context.$element().html(template());
      });
  };

  function add(context) {
    templates.get('message-add')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-message-add').on('click', function() {

          var message = {
            title: $('#tb-message-title').val(),
            content: $('#tb-message-content').val(),
            recipientName:$('#tb-message-recipient').val()
          };

          data.messages.add(message)
            .then(function(message) {
              toastr.success(`Message successfully send!`);
              document.location = "#/messages";
            }, function(error) {
              console.log(error);
              toastr.error(error);
            });
        });
      });
  }

  let checkSent = function(context) {
    let messages;
    data.messages.getSent()
      .then(function(response) {
        messages = response;
        return templates.get("messages-sent");
      })
      .then(function(template) {
        context.$element().html(template(messages));
      });
  };

  let checkReceived = function(context) {
    let messages;
    data.messages.getReceived()
      .then(function(response) {
        messages = response;
        return templates.get("messages-received");
      })
      .then(function(template) {
        context.$element().html(template(messages));
      });
  };

  return {
    menu: menu,
    add: add,
    checkReceived,
    checkSent
  };
}());