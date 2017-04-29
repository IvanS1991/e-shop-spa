var productsController = (function() {

  function all(context) {
    var products;
    data.products.get()
      .then(function(resProducts) {
        products = resProducts;
        return templates.get('products');
      })
      .then(function(template) {
        context.$element().html(template(products));
      });
  }

  function add(context) {
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
              toastr.success(`Product successfully added!`);
            });
        });
      });
  }

  return {
    all: all,
    add: add
  };
}());