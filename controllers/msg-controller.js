module.exports = function(db) {

    let factory = require("../utils/factory");   

    let sent = function(request, response) {
        let authKey = request.headers["x-auth-key"];

        let author = db.get("users")
                        .find({authKey: authKey})
                        .value();

        let messages = db.get("messages")
                        .filter({authorId: author.userId})
                        .reverse()
                        .value();
        
        response.json({
            messages: messages
        });
    };

    let received = function(request, response) {
        let authKey = request.headers["x-auth-key"];

        let recipient = db.get("users")
                        .find({authKey: authKey})
                        .value();

        let messages = db.get("messages")
                        .filter({recipientId: recipient.userId})
                        .reverse()
                        .value();
        
        response.json({
            messages: messages
        });
    };

    let create = function(request, response) {
        let msgData = request.body.message;

        let authKey = request.headers["x-auth-key"];

        let author = db.get("users")
                        .find({authKey: authKey})
                        .value();

        let recipient = db.get("users")
                            .find({username: msgData.recipientName})
                            .value();

        if (!recipient) {
            response.status(404)
                    .json("Non-existing recipient");
            return;
        }

        if (author.userId === recipient.userId) {
            response.status(404)
                    .json("Cannot send messages to yourself");
            return;
        }

        let message = factory.getMessage(msgData.title, msgData.content, author.username, author.userId, recipient.username, recipient.userId);
        
        db.get("messages")
            .push(message)
            .write();

        response.json({
            msgId: message.msgId
        });
    };

    let remove = function(request, response) {
        let msgData = request.body;

        let authKey = request.headers["x-auth-key"];

        let msg = db.get("messages")
                    .find({msgId: msgData.msgId})
                    .value();

        let index = db.get("messages")
                    .indexOf(msg)
                    .value();

        let recipient = db.get("users")
                    .find({authKey: authKey})
                    .value();
        
        if (recipient.userId === msg.recipientId) {
            
            db.get("messages")
                .splice(index, 1)
                .write();

            response.status(200)
                    .json("Success");
        } else {
            response.status(404)
                    .json("Cannot delete other users' messages");
        }
    };

    return {
        sent,
        received,
        create,
        remove
    }
};