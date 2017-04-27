module.exports = function(db) {

    let factory = require("../utils/factory");

    let all = function(request, response) {
        let users = db.get("users")
                    .value();

        response.json({
            users
        });
    };

    let register = function(request, response) {
        let userData = request.body;

        let match = db.get("users")
                    .find({username: userData.username})
                    .value();

        if (match) {
            response.status(404)
                    .json("Existing user");
            return;
        }

        let user = factory.getUser(userData.username, userData.passHash);

        db.get("users")
            .push(user)
            .write();
        
        response.json({
            username: user.username,
            authKey: user.authKey
        });
    };

    let login = function(request, response) {
        let userData = request.body;

        let match = db.get("users")
                    .find({
                        usernameToLower: userData.username.toLowerCase(),
                        passHash: userData.passHash
                    })
                    .value();

        if (match) {
            response.status(200)
                .json({
                    username: match.username,
                    authKey: match.authKey
                });
        } else {
            response.status(404)
                .json("Wrong username/password");
        }
    };

    return {
        all,
        register,
        login
    }
};