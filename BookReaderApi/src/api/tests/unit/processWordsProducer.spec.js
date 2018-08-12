const { assert } = require("chai");
const producer = require("../../../producers/processWords");

describe("Producer processWords test", () => {
  it("Producer should not be undefined", () => {
    assert.notEqual(producer, undefined);
  });

  it("Producer should have a method registerProducer", () => {
    assert.notEqual(producer.registerProducer, undefined);
  });

  it("Producer should have a method publishProcessWords", () => {
    assert.notEqual(producer.publishProcessWords, undefined);
  });
});
