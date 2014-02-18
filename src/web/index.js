var express = require("express");
var restify = require("restify");

var apiHost = process.env.API_PORT_7777_TCP_ADDR;
var apiPort = process.env.API_PORT_7777_TCP_PORT;
var url = "http://" + apiHost + ":" + apiPort;

console.log("Web connecting to API on " + url);

var client = restify.createJsonClient({
    url: url
});

var app = express();

app.configure(function() {
    app.use(express.logger());
    app.use(app.router);
});

app.get("/", function(req, res) {
    client.put("/visitors", function(err, apiReq, apiRes, object) {
        res.end("You are visitor number " + object.count + "!");
    });
});

app.listen(8888);
console.log("Web interface running on port 8888");
