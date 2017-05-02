var productsController = (function() {

  function all(context) {
    var products;
    let categoryFilter = parseQuery(document.location.href).category;

    data.products.get()
      .then(function(res) {
        if (categoryFilter) {
          categoryFilter = decodeURIComponent(categoryFilter);
          res.products = res.products.filter(x => x.category === categoryFilter);
        }
        products = res;
        return templates.get('products');
      })
      .then(function(template) {
        context.$element().html(template(products));

        $("#accordion").accordion({
          collapsible: true,
          active: false
        });
      });
  }

  function add(context) {
    validator.auth();
    templates.get('product-add')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-product-add').on('click', function() {

          var product = {
            title: $('#tb-product-title').val(),
            description: $('#tb-product-description').val(),
            category: $('#tb-product-category').val(),
            price: Number($('#tb-product-price').val())
          };

          data.products.add(product)
            .then(function(product) {
              context.redirect("#/products");
              toastr.success(`Product successfully added!`);
            }, function(error) {
              toastr.error(error.responseText);
            });
        });
      });
  }

  return {
    all: all,
    add: add
  };
}());