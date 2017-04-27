var productsController = (function() {

  function all(context) {
   var products;
    data.products.get()
      .then(function(resProducts) {
        products = resProducts;
        return templates.get('products')
      })
      .then(function(template) {
        context.$element().html(template());
  });   
  }

    function add(context) {
    templates.get('product-add')
      .then(function(template) {
        context.$element().html(template());     

        $('#btn-product-add').on('click', function() {       

          var product = {
            title: $('#tb-product-title').val(),
            description: $('#tb-product-description').val()       
          };

          product-controller.add(product)
            .then(function(product) {
              toastr.success(`Product "${product.title}" added!`);          
            });
        });
    });
    }
  
  return {
    all: all,
    add: add
  };
}());
