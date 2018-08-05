var redis = require("redis");

var redisCleint = redis.createClient();

redisCleint.on("connect", function() {
  console.log("Redis client connected");
});

redisCleint.on("error", function(err) {
  console.log("Something went wrong " + err);
});

let accumulated = "";
exports.wordCounter = data => {
  var parts = (accumulated + data).split("\n");
  accumulated = parts.pop();

  parts.map(part => {
    part.split(" ").map(word => {
      const ele = word.replace(/[^A-Z0-9]/gi, "");
      redisCleint.get(ele, function(error, result) {
        if (error) {
          throw error;
        }

        if (!result) {
          redisCleint.set(ele, "1");
        } else {
          redisCleint.incr(ele);
        }
      });
    });
    return true;
  });
};
