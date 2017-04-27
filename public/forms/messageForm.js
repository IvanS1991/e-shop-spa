var messageForm = (function() {

  function all(context) {
   var products;
    msg-controller.get()
      .then(function(resMess) {
        messages = resMess;
        return templates.get('messages')
      })
      .then(function(template) {
        context.$element().html(template());
  });   
  }

    function add(context) {
    templates.get('message-add')
      .then(function(template) {
        context.$element().html(template());     

        $('#btn-message-add').on('click', function() {       

          var product = {
            title: $('#tb-message-title').val(),
            description: $('#tb-message-description').val()       
          };

          msg-controller.add(message)
            .then(function(message) {
              toastr.success(`Message "${message.title}" added!`);          
            });
        });
    });
    }
  
  return {
    all: all,
    add: add
  };
}());
