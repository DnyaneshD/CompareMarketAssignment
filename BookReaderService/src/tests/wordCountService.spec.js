const sinon = require("sinon");
const { assert } = require("chai");
var redis = require("redis");
const wordCountService = require("../business/wordCountService");

describe("wordCountService test", () => {
  it("service should not be undefined", () => {
    assert.notEqual(wordCountService, undefined);
  });

  it("service should have a method wordCounter", () => {
    assert.notEqual(wordCountService.wordCounter, undefined);
  });

  it("wordCounter method should be called once", async () => {
    //Arrange
    const wordCounterSpy = sinon.spy(wordCountService, "wordCounter");
    //Act
    await wordCountService.wordCounter("Hello \n world");
    //Assert
    assert.isTrue(wordCounterSpy.calledOnce);
  });

  it("wordCounter method should return correct count", async () => {
    //Arrange
    var redisClient = redis.createClient(
      "//'':hNtpz58VXjAnudYVsWBcnSJMR967X3Zh@redis-12480.c52.us-east-1-4.ec2.cloud.redislabs.com:12480"
    );

    redisClient.get = () => {
      return kela;
    };

    //Act
    const result = await wordCountService.wordCounter("Hello \n world");
    //Assert
    assert.equal(result, !undefined);
  });

  it("service should have a method checkCountIfPrime", () => {
    assert.notEqual(wordCountService.checkCountIfPrime, undefined);
  });

  it("checkCountIfPrime method should be called once", async () => {
    //Arrange
    const checkCountIfPrimeSpy = sinon.spy(
      wordCountService,
      "checkCountIfPrime"
    );
    //Act
    await wordCountService.checkCountIfPrime();
    //Assert
    assert.isTrue(checkCountIfPrimeSpy.calledOnce);
  });
});
