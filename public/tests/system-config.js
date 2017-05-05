System.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        "crypto-js": "./../bower_components/cryptojs-sha1/cryptojs-sha1.js",
        "toastr": "./../bower_components/toastr/toastr.js",
         "jquery": "./../bower_components/jquery/dist/jquery.js",
        'json-requester':'./../js/json-requester.js',
        'validator':'./../js/validator.js',
        'data':'./../js/data.js',
        'tests':'./tests.js'
    }
});
