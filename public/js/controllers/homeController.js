import toastr from "toastr";
import {templates} from "templates";
import {data} from "data";

var homeController = function() {

  class HomeController {
    all(context) {
      templates.get('home')
          .then(function(template) {
          context.$element().html(template());
        });
    }
  }
  

  return new HomeController();
}();

export {homeController};