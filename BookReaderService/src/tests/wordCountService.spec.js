const sinon = require("sinon");
const { assert } = require("chai");
const redisService = require("../services/redisService");
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
    var redisClient = redisService.connectRedis();

    var get = {
      get: () => {
        return "";
      }
    };
    sinon.stub(redisClient, "get").returns(get);

    //Act
    const result = await wordCountService.wordCounter("Hello \n world");
    //Assert
    assert.equal(result.length, 2);
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

  it("checkCountIfPrime should get keys and check if promise", async () => {
    //Arrange
    var redisClient = redisService.connectRedis();

    var keys = {
      keys: () => {
        ["kela"];
      }
    };
    sinon.stub(redisClient, "keys").returns(keys);
    //Act
    await wordCountService.checkCountIfPrime();
    //Assert
    //assert.isTrue(checkCountIfPrimeSpy.calledOnce);
  });
});
