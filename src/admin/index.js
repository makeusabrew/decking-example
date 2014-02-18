var express = require("express");
var app = express();

app.configure(function() {
    app.use(express.logger());
    app.use(app.router);
});

app.get("/", function(req, res) {
    res.end("Admin system");
});

app.post("/login", function(req, res) {
    // make API GET for user based on details
});

app.listen(8887);
console.log("Admin interface running on port 8887");
