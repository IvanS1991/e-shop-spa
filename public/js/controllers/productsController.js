import toastr from "toastr";
import "jquery-ui";
import {templates} from "templates";
import {parseQuery} from "parse-query";
import {data} from "data";
import {validator} from "validator";

var productsController = (function() {

  class ProductsController {
    all(context) {
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

          $(".btn-add-to-cart").on("click", function() {
            let $that = $(this);
            let id = $that.attr("data-product-id");
            if (!localStorage.SHOPPING_CART) {
              localStorage.setItem("SHOPPING_CART", id);
              toastr.success("Added product to cart!");
            } else if (localStorage.SHOPPING_CART && localStorage.SHOPPING_CART.search(id) < 0) {
              localStorage.SHOPPING_CART += "," + id;
              toastr.success("Added product to cart!");
            } else {
              toastr.error("This product is added to your cart already!");
              return;
            }
          });

          $("#accordion").accordion({
            collapsible: true,
            active: false
          });
        });
    }

    add(context) {
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
                toastr.success(`Product successfully added!`);
              }, function(error) {
                toastr.error(error.responseText);
              });
          });
        });
    }

    manage(context) {
      let products;
      let categoryFilter = parseQuery(document.location.href).category;

      validator.auth();
      data.products.getForCurrentUser()
        .then(function(response) {
          if (categoryFilter) {
            categoryFilter = decodeURIComponent(categoryFilter);
            response.products = response.products.filter(x => x.category === categoryFilter);
          }
          products = response;
          return templates.get("products-manage");
        })
        .then(function(template) {
          context.$element().html(template(products));

          $("#accordion").accordion({
            collapsible: true,
            active: false
          });
        });
    };

    delete(context) {
      templates.get("product-delete")
        .then(function(template) {
          context.$element().html(template());

          $("#btn-delete-confirm").on("click", function(e) {
            let productId = parseQuery(document.location.href).productid;
            data.products.delete(productId)
              .then(function(response) {
                toastr.success("Product deleted successfuly!");
              }, function(error) {
                toastr.error(error.responseText);
              });
          });
        });
    };
  }
  

  return new ProductsController();
}());

export {productsController};