module.exports = function(db) {

    let post = function(request, response) {
        let products = request.body.products.split(",");

        products.forEach(function(x) {
            let product = db.get("products")
                        .find({productId: x})
                        .value();

            let productIndex = db.get("products")
                        .indexOf(product)
                        .value();
            
            let seller = db.get("users")
                        .find({username: product.seller})
                        .value();

            let sellerIndex = db.get("users")
                        .indexOf(seller)
                        .value();
            
            seller.cash += product.price;
        });

        response.status(200)
                .json("OK");
    };

    return {
        post
    }
};