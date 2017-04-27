module.exports = (function() {

    let generator = require("./generator");
    let timeParser = require("./time-parser");

    class User {
        constructor(username, passHash) {
            this.username = username;
            this.usernameToLower = this.username.toLowerCase();
            this.passHash = passHash;
            this.userId = generator.userId();
            this.authKey = generator.authKey(this.username);
            this.cash = 0;
            this.created = timeParser(new Date());
        }
    }

    class Message {
        constructor(title, content, authorId, recipientId) {
            this.title = title;
            this.content = content;
            this.msgId = generator.msgId();
            this.authorId = authorId;
            this.recipientId = recipientId;
            this.created = timeParser(new Date());
            this.seen = false;
        }
    }

    class Product {
        constructor(title, description, category, price, sellerId) {
            this.title = title;
            this.description = description;
            this.category = category;
            this.price = price;
            this.productId = generator.productId();
            this.sellerId = sellerId;
            this.created = timeParser(new Date());
        }
    }

    function getUser(username, passHash) {
        return new User(username, passHash);
    }

    function getMessage(title, content, authorId, recipientId) {
        return new Message(title, content, authorId, recipientId);
    }

    function getProduct(title, description, category, price, sellerId) {
        return new Product(title, description, category, price, sellerId);
    }

    return {
        getUser,
        getMessage,
        getProduct
    }
}());