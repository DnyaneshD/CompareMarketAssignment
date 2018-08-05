const sinon = require("sinon");
const { assert } = require("chai");
const controller = require("../../controllers/bookReader.controller");

describe("Book reader Controller test", () => {
  it("controller should not be undefined", () => {
    assert.notEqual(controller, undefined);
  });

  it("controller should have getWordsList method", () => {
    assert.notEqual(controller.getWordsList, undefined);
  });

  it("getWordsList method should be asyn mehtod", () => {
    assert.equal(controller.getWordsList[Symbol.toStringTag], "AsyncFunction");
  });

  it("getWordslist method should be called once", async () => {
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
