var express     = require("express");
var app         = express();
var MongoClient = require("mongodb").MongoClient;
var redis       = require("redis");

// environment stuff we get from Docker with links
var redisPort = process.env.REDIS_PORT_6379_TCP_PORT;
var redisHost = process.env.REDIS_PORT_6379_TCP_ADDR;

var dbPort = process.env.DB_PORT_27017_TCP_PORT;
var dbHost = process.env.DB_PORT_27017_TCP_ADDR;

var dsn = "mongodb://" + dbHost + ":" + dbPort + "/decking_test";

console.log("API Connection params to Redis: " + redisHost + ":" + redisPort);
console.log("API Connection params to MongoDB: " + dsn);

app.configure(function() {
    app.use(function(req, res, next) {
        console.log("%s - %s - %s %s (%s)", new Date, req.ip, req.method, req.url, req.headers["user-agent"]);
        next();
    });
    app.use(app.router);
});

app.get("/", function(req, res, next) {
  return res.json(200, {
    "message": "Try GET /visitors or GET /users"
  });
});


app.put("/visitors", function(req, res, next) {
    var client = redis.createClient(redisPort, redisHost);
    client.incr("visitors", function(err, result) {
        if (err) {
            return next(err);
        }

        return res.json(200, {
            count: result
        });
    });
});

app.get("/visitors", function(req, res, next) {
    var client = redis.createClient(redisPort, redisHost);
    client.get("visitors", function(err, result) {
        if (err) {
            return next(err);
        }

        result = result || 0;
        return res.json(200, {
            count: result
        });
    });
});

app.get("/users", function(req, res, next) {
    MongoClient.connect(dsn, function(err, db) {
        if (err) {
            throw err;
        }

        // fetch from MongoDB based on query
    });
});

app.listen(7777);
console.log("API Server running on port 7777");
