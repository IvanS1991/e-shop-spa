module.exports = function(db) {

    let factory = require("../utils/factory");   

    let get = function(request, response) {
        let authKey = request.headers["x-auth-key"];

        let seller = db.get("users")
                        .find({authKey: authKey})
                        .value();
        let products;
        let categories;

        if (seller) {
            products = db.get("products")
                        .filter({sellerId: seller.userId})
                        .value();    

            categories = db.get("products")
                        .filter({sellerId: seller.userId})
                        .map(x => x.category)
                        .uniq()
                        .sort()
                        .value();
        } else {
            products = db.get("products")
                        .value();

            categories = db.get("products")
                        .map(x => x.category)
                        .uniq()
                        .sort()
                        .value();
        }

        response.status(200)
            .json({
                categories: categories,
                products: products
            });
    };

    let create = function(request, response) {
        let productData = request.body.product;

        let authKey = request.headers["x-auth-key"];

        let seller = db.get("users")
                    .find({authKey: authKey})
                    .value();

        if (seller) {
            let product = factory.getProduct(productData.title, productData.description, productData.category, productData.price, seller.username, seller.userId);

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

        let authKey = request.headers["x-auth-key"];

        let product = db.get("products")
                    .find({productId: productData.productId})
                    .value();

        let index = db.get("products")
                    .indexOf(product)
                    .value();

        let seller = db.get("users")
                    .find({authKey: authKey})
                    .value();
        
        if (seller.userId === product.sellerId) {
            
            db.get("products")
                .splice(index, 1)
                .write();

            response.status(200)
                    .json({
                        sellerId: seller.userId
                    });
        } else if (!product) {
            response.status(404)
                    .json("Non-existing product");
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