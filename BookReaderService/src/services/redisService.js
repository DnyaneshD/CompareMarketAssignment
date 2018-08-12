var redis = require("redis");

exports.connectRedis = () => {
  var redisClient = redis.createClient(
    "//'':hNtpz58VXjAnudYVsWBcnSJMR967X3Zh@redis-12480.c52.us-east-1-4.ec2.cloud.redislabs.com:12480"
  );

  redisClient.on("connect", function() {
    console.log("Redis client connected");
  });

  redisClient.on("error", function(err) {
    console.log("Something went wrong " + err);
  });

  return redisClient;
};
