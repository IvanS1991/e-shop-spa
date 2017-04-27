module.exports = function(db) {

    let factory = require("../utils/factory");   

    let get = function(request, response) {
        //TODO
    };

    let create = function(request, response) {
        let productData = request.body;

        let seller = db.get("users")
                    .find({authKey: productData.authKey})
                    .value();

        if (seller) {
            let product = factory.getProduct(productData.title, productData.description, productData.category, productData.price, seller.userId);

            db.get("products")
                .push(product)
                .write();

            response.status(200)
                    .json({
                        productId: product.productId
                    });
        } else {
            response.status(404)
                    .json("No such user");
        }
    };

    let update = function(request, response) {
        //TODO
    };

    let remove = function(request, response) {
        let productData = request.body;

        let product = db.get("products")
                    .find({productId: productData.productId})
                    .value();

        let index = db.get("products")
                    .indexOf(product)
                    .value();

        let seller = db.get("users")
                    .find({authKey: productData.authKey})
                    .value();
        
        if (seller.userId === product.sellerId) {
            
            db.get("products")
                .splice(index, 1)
                .write();

            response.status(200)
                    .json({
                        sellerId: seller.userId
                    });
        } else {
            response.status(404)
                    .json("Cannot delete other users' products");
        }
    };

    return {
        get,
        create,
        update,
        remove
    }
};