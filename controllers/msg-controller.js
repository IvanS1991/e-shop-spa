module.exports = function(db) {

    let factory = require("../utils/factory");   

    let sent = function(request, response) {
        //TODO
    };

    let received = function(request, response) {
        //TODO
    };

    let create = function(request, response) {
        let msgData = request.body;

        let author = db.get("users")
                        .find({authKey: msgData.authKey})
                        .value();

        let recipient = db.get("users")
                            .find({userId: msgData.recipientId})
                            .value();

        if (author.userId === recipient.userId) {
            response.status(404)
                    .json("Cannot send messages to yourself");
            return;
        }

        let message = factory.getMessage(msgData.title, msgData.content, author.userId, recipient.userId);
        
        db.get("messages")
            .push(message)
            .write();

        response.json({
            msgId: message.msgId
        });
    };

    let remove = function(request, response) {
        let msgData = request.body;

        let msg = db.get("messages")
                    .find({msgId: msgData.msgId})
                    .value();

        let index = db.get("messages")
                    .indexOf(msg)
                    .value();

        let author = db.get("users")
                    .find({authKey: msgData.authKey})
                    .value();
        
        if (author.userId === msg.authorId) {
            
            db.get("messages")
                .splice(index, 1)
                .write();

            response.status(200)
                    .json({
                        authorId: author.userId
                    });
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