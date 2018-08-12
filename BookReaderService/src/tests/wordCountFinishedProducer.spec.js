const sinon = require("sinon");
const { assert } = require("chai");
const wordCountFinishedProducer = require("../producers/wordCountFinished");

describe("wordCountFinishedProducer tests", () => {
  it("producer should not be undefined", () => {
    assert.notEqual(wordCountFinishedProducer, undefined);
  });

  it("producer should have a method registerProducer", () => {
    assert.notEqual(wordCountFinishedProducer.registerProducer, undefined);
  });

  it("registerProducer method should be called once", async () => {
    //Arrange
    const registerProducerSpy = sinon.spy(
      wordCountFinishedProducer,
      "registerProducer"
    );
    //Act
    await wordCountFinishedProducer.registerProducer();
    //Assert
    assert.isTrue(registerProducerSpy.calledOnce);
  });

  it("producer should have a method notifyWhenFinished", () => {
    assert.notEqual(wordCountFinishedProducer.notifyWhenFinished, undefined);
  });

  it("checkCountIfPrime method should be called once", async () => {
    //Arrange
    const notifyWhenFinishedSpy = sinon.spy(
      wordCountFinishedProducer,
      "notifyWhenFinished"
    );
    //Act
    await wordCountFinishedProducer.notifyWhenFinished();
    //Assert
    assert.isTrue(notifyWhenFinishedSpy.calledOnce);
  });
});
