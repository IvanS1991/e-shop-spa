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

app.listen(serverConfig.port, function() {
    console.log(`Listening - http://localhost:${serverConfig.port}`);
});