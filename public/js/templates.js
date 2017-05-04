import Handlebars from "handlebars";

var templates = function() {
  let cache = {};

  class TemplateLoader {
    get(name) {
      var promise = new Promise(function(resolve, reject) {
        if (cache[name]) {
          resolve(cache[name]);
          return;
        }
        var url = `/templates/${name}.handlebars`;
        $.get(url, function(html) {
          var template = Handlebars.compile(html);
          cache[name] = template;
          resolve(template);
        });
      });
      return promise;
    }
  }

  return new TemplateLoader();
}();

export {templates};