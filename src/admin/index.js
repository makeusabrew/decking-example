var express = require("express");
var restify = require("restify");

var apiHost = process.env.API_PORT_7777_TCP_ADDR;
var apiPort = process.env.API_PORT_7777_TCP_PORT;
var url = "http://" + apiHost + ":" + apiPort;

console.log("Admin connecting to API on " + url);

var client = restify.createJsonClient({
    url: url
});

var app = express();

app.configure(function() {
    app.use(function(req, res, next) {
        console.log("%s - %s - %s %s (%s)", new Date, req.ip, req.method, req.url, req.headers["user-agent"]);
        next();
    });
    app.use(app.router);
});

app.get("/", function(req, res) {
    res.end("Admin system");
});

app.post("/login", function(req, res) {
    // make API GET for user based on details
});

app.get("/visits", function(req, res) {
    client.get("/visitors", function(err, apiReq, apiRes, object) {
        res.end("Total visitors since server started: " + object.count);
    });
});

app.listen(8887);
console.log("Admin interface running on port 8887");
