module.exports = (function() {

    const symbols = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    const len = symbols.length;

    let getId = function(keyLength, prefix) {
        let output = prefix || "";

        for (let i = 0; i < keyLength; i += 1) {
            output += symbols[Math.floor(Math.random() * len)];
        }

        return output;
    };

    let userId = function() {
        return getId(60);
    };

    let authKey = function(username) {
        return getId(60, username);
    };

    let msgId = function() {
        return getId(60, "MSG");
    };

    let productId = function() {
        return getId(60, "PROD");
    };

    return {
        userId,
        authKey,
        msgId,
        productId
    }
}());