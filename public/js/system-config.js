System.config({
    transpiler: "plugin-babel",
    map: {
        "plugin-babel": "node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",

        // EXTERNAL LIBS
        "jquery": "./bower_components/jquery/dist/jquery.js",
        "toastr": "./bower_components/toastr/toastr.js",
        "jquery-ui": "./bower_components/jquery-ui/jquery-ui.js",
        "sammy": "./bower_components/sammy/lib/sammy.js",
        "handlebars": "./bower_components/handlebars/handlebars.js",
        "crypto-js": "./bower_components/cryptojs-sha1/cryptojs-sha1.js",

        // APP HELPERS
        "validator": "./js/validator.js",
        "parse-query": "./js/parse-query.js",
        "json-requester": "./js/json-requester.js",
        "data": "./js/data.js",
        "templates": "./js/templates.js",

        //  APP CONTROLLERS
        "usersController": "./js/controllers/usersController.js",
        "productsController": "./js/controllers/productsController.js",
        "homeController": "./js/controllers/homeController.js",
        "messagesController": "./js/controllers/messagesController.js",
        "cartController": "./js/controllers/cartController.js",
        
        // APP
        "app": "./js/app.js"
    }
});

System.import("app");