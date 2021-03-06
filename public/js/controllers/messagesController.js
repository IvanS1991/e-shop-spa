import toastr from "toastr";
import "jquery-ui";
import {templates} from "templates";
import {parseQuery} from "parse-query";
import {data} from "data";
import {validator} from "validator";

var messagesController = (function() {

  class MessagesController {

    add(context) {
      let users;
      
      data.users.get()
        .then(function(response) {
            users = response.users.map(function(x) {
                return x.username;
            });
            return templates.get('message-add');
        })
        .then(function(template) {
          context.$element().html(template());
          
          $("#tb-message-recipient").autocomplete({
            source: users,
            delay: 10,
            minLength: 0
          }).focus(function() {
            $(this).autocomplete("search");
          });
          
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
                window.history.back();
                toastr.success(`Message successfully send!`);
              }, function(error) {
                toastr.error(error.responseText);
              });
          });
        });
    }

    checkSent(context) {
      let messages;
      data.messages.getSent()
        .then(function(response) {
          messages = response;
          return templates.get("messages-sent");
        })
        .then(function(template) {
          context.$element().html(template(messages));

          $("#accordion").accordion({
            collapsible: true,
            active: false
          });
        });
    };

    checkReceived(context) {
      let messages;
      data.messages.getReceived()
        .then(function(response) {
          messages = response;
          return templates.get("messages-received");
        })
        .then(function(template) {
          context.$element().html(template(messages));

          $("#accordion").accordion({
            collapsible: true,
            active: false
          });
        });
    };
    
    delete(context) {
      templates.get("message-delete")
        .then(function(template) {
          context.$element().html(template());

          $("#btn-delete-confirm").on("click", function() {
            let msgId = parseQuery(document.location.href).messageId;
            data.messages.delete(msgId)
              .then(function(response) {
                window.history.back();
                toastr.success("Message deleted successfuly");
              }, function(error) {
                toastr.error(error.responseText);
              });
          });

          $("#btn-delete-decline").on("click", function() {
            window.history.back();
          });
        });
    };
  }
  

  return new MessagesController();
}());

export {messagesController};