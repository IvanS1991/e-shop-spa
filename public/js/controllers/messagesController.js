var messagesController = (function() {

  function add(context) {
    templates.get('message-add')
      .then(function(template) {
        context.$element().html(template());
        
        let queries = parseQuery(document.location.href);
        
        if (queries.hasOwnProperty("recipient")) {
          $("#tb-message-recipient").val(queries.recipient);
        }

        $('#btn-message-add').on('click', function() {

          var message = {
            title: $('#tb-message-title').val(),
            content: $('#tb-message-content').val(),
            recipientName:$('#tb-message-recipient').val()
          };

          data.messages.add(message)
            .then(function(message) {
              toastr.success(`Message successfully send!`);
              document.location = "#/messages/received";
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
    add: add,
    checkReceived,
    checkSent
  };
}());