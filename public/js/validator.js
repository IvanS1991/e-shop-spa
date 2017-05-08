import toastr from "toastr";

let validator = (function() {

    let errMsg = function(msg) {
        toastr.error(msg);
        throw new Error(msg);
    };

    let err = {
        username: "Username must be between 2 and 20 symbols long and can contain latin letters and digits.",
        password: "Password must be between 6 and 40 symbols long, may contain latin letters and digits only, and must contain atleast 1 digit, 1 small and 1 big letter.",
        emptyTitle: "Title cannot be empty",
        emptyContent: "Content cannot be empty",
        emptyCategory: "Category cannot be empty",
        emptyDescription: "Description cannot be empty",
        productPrice: "Price must be a number bigger than 0",
        userAuth: "You must be logged in to do that"
    };

    class Validator {
        user(userData) {
            let invalidUsername = userData.username.search(/[a-zA-Z0-9]{2,20}/) < 0;
            let invalidPassword = userData.password.search(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,40}/) < 0;
            if (invalidUsername) {
                errMsg(err.username);
            }
            if (invalidPassword) {
                errMsg(err.password);
            }
        }

        msg(msgData) {
            let invalidTitle = msgData.title === "";
            let invalidContent = msgData.content === "";
            if (invalidTitle) {
                errMsg(err.emptyTitle);
            }
            if (invalidContent) {
                errMsg(err.emptyContent);
            }
        }

        product(productData) {
            let invalidTitle = productData.title === "";
            let invalidCategory = productData.category === "";
            let invalidDescription = productData.description === "";
            let invalidPrice = productData.price === "" || isNaN(+productData.price) || +productData.price <= 0;
            if (invalidTitle) {
                errMsg(err.emptyTitle);
            }
            if (invalidCategory) {
                errMsg(err.emptyCategory);
            }
            if (invalidDescription) {
                errMsg(err.emptyDescription);
            }
            if (invalidPrice) {
                errMsg(err.productPrice);
            }
        }

        auth() {
            if (!localStorage.getItem("LOGIN_AUTHKEY")) {
                errMsg(err.userAuth);
            }
        }
    }
    

    return new Validator();  
}());

export {validator};