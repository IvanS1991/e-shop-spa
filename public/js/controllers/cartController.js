import toastr from "toastr";
import "jquery-ui";
import {templates} from "templates";
import {parseQuery} from "parse-query";
import {data} from "data";
import {validator} from "validator";

let cartController = (function() {

    class ShoppingCart {
        show(context) {
            if (!localStorage.SHOPPING_CART) {
                toastr.error("There are no products in your cart, add some!");
                return;
            }
            let productsData;

            data.products.getByIds(localStorage.SHOPPING_CART)
                .then(function(response) {
                    productsData = response;
                    return templates.get("shopping-cart");
                })
                .then(function(template) {
                    context.$element().html(template(productsData));

                    $("#btn-cart-clear").on("click", function() {
                        localStorage.removeItem("SHOPPING_CART");
                        toastr.success("Shopping cart has been cleared successfuly.");
                        window.history.back();
                    });
                });
        }

        checkout(context) {
            templates.get("shopping-cart-checkout")
                .then(function(template) {
                    context.$element().html(template());

                    $("#btn-checkout-confirm").on("click", function() {
                        data.order.checkout(localStorage.SHOPPING_CART)
                            .then(function(response) {
                                localStorage.removeItem("SHOPPING_CART");
                                toastr.success("Successful checkout!");
                                context.redirect("#/");
                            });
                    });
                });
        }
    }

    return new ShoppingCart();
}());

export {cartController};