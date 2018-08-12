const sinon = require("sinon");
const { assert } = require("chai");
const processWordCountConsumer = require("../consumers/processWordCount");

describe("ProcessWordCountConsumer test", () => {
  it("consumer should not be undefined", () => {
    assert.notEqual(processWordCountConsumer, undefined);
  });

  it("consumer should have a method registerConsumer", () => {
    assert.notEqual(processWordCountConsumer.registerConsumer, undefined);
  });

  it("registerConsumer method should be called once", async () => {
    //Arrange
    const registerConsumerSpy = sinon.spy(
      processWordCountConsumer,
      "registerConsumer"
    );
    //Act
    await processWordCountConsumer.registerConsumer();
    //Assert
    assert.isTrue(registerConsumerSpy.calledOnce);
  });
});
