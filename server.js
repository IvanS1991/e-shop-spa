let express = require("express"),
    lowdb = require("lowdb"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    serverConfig = require("./config/server-config");

let app = express(),
    db = lowdb(serverConfig.db);

app.use(cors());
app.use(bodyParser.json());
app.use("/", express.static("public"));
app.use("/", express.static("public/tests"));
app.use("/node_modules", express.static("node_modules"));

// Users
let userController = require("./controllers/user-controller")(db);
app.get("/api/users", userController.all);
app.post("/api/users", userController.register);
app.put("/api/users", userController.login);

// Profiles
let profileController = require("./controllers/profile-controller")(db);
app.get("/api/profiles", profileController.get);

// Messages
let msgController = require("./controllers/msg-controller")(db);
app.get("/api/messages/sent", msgController.sent);
app.get("/api/messages/received", msgController.received);
app.post("/api/messages", msgController.create);
app.delete("/api/messages", msgController.remove);

// Products
let productController = require("./controllers/product-controller")(db);
app.get("/api/products", productController.get);
app.post("/api/products", productController.create);
app.put("/api/products", productController.update);
app.delete("/api/products", productController.remove);
app.get("/api/products/categories", productController.getCategories);

// Orders - not working properly
let orderController = require("./controllers/order-controller")(db);
app.post("/api/orders", orderController.post);

app.listen(serverConfig.port, function() {
    console.log(`Listening - http://localhost:${serverConfig.port}`);
});