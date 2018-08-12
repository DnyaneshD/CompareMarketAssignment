const sinon = require("sinon");
const { assert } = require("chai");
const controller = require("../../controllers/bookReader.controller");
const processWords = require("../../../producers/processWords");

describe("Book reader Controller test", () => {
  it("controller should not be undefined", () => {
    assert.notEqual(controller, undefined);
  });

  it("controller should have processWordsList method", () => {
    assert.notEqual(controller.processWordsList, undefined);
  });

  it("processWordsList method should be called once", async () => {
    //Arrange
    const req = { body: {} };
    const next = () => {};
    const res = {};

    const processWordsListSpy = sinon.spy(controller, "processWordsList");

    //Act
    const test = await controller.processWordsList(req, res, next);

    console.log(test);

    //Assert
    assert.isTrue(processWordsListSpy.calledOnce);
  });

  it("processWordsList method publishProcessWords should be called once", async () => {
    //Arrange
    const req = { body: { url: "https://test.com" } };
    const next = () => {};
    const res = {};

    const publishProcessWordsSpy = sinon.spy(
      processWords,
      "publishProcessWords"
    );

    //Act
    await controller.processWordsList(req, res, next);

    //Assert
    assert.isTrue(publishProcessWordsSpy.calledOnce);
  });

  it("controller should have getWordsList method", () => {
    assert.notEqual(controller.getWordsList, undefined);
  });

  it("getWordsList method should be asyn mehtod", () => {
    assert.equal(controller.getWordsList[Symbol.toStringTag], "AsyncFunction");
  });

  it("getWordsList method should be called once", async () => {
    //Arrange
    const req = { body: {} };
    const next = () => {};
    const res = {};

    const getWordsListSpy = sinon.spy(controller, "getWordsList");

    //Act
    await controller.getWordsList(req, res, next);

    //Assert
    assert.isTrue(getWordsListSpy.calledOnce);
  });
});
