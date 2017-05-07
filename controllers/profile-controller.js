module.exports = function(db) {

    let get = function(request, response) {
        let authKey = request.headers["x-auth-key"];

        let userId = request.query.userId;

        let isAuthenticated;

        let user;
        
        if (authKey) {
            user = db.get("users")
                        .find({authKey: authKey})
                        .value();

            isAuthenticated = true;
        } else if (userId) {
            user = db.get("users")
                        .find({userId: userId})
                        .value();
            
            isAuthenticated = false;
        } else if (authKey && userId) {
            response.status(404)
                    .json("You have to provide either userId as a query, or authKey as a request header");
            
            return;
        }

        if (!user) {
            response.status(404)
                    .json("No such user");
            
            return;
        }

        let userProducts = db.get("products")
                        .filter({sellerId: user.userId})
                        .value();

        response.status(200)
                .json({
                    user,
                    isAuthenticated,
                    products: userProducts
                });
    };

    return {
        get
    }
};