const sinon = require("sinon");
const { assert } = require("chai");
const controller = require("../../controllers/bookReader.controller");

describe("Book reader Controller test", () => {
  it("controller should not be undefined", () => {
    assert.notEqual(controller, undefined);
  });

  it("controller should have processWordsList method", () => {
    assert.notEqual(controller.processWordsList, undefined);
  });

  it("processWordsList method should be asyn mehtod", () => {
    assert.equal(
      controller.processWordsList[Symbol.toStringTag],
      "AsyncFunction"
    );
  });

  it("processWordsList method should be called once", async () => {
    //Arrange
    const req = { body: {} };
    const next = () => {};
    const res = {};

    const processWordsListSpy = sinon.spy(controller, "getWordsList");

    //Act
    await controller.getWordsList(req, res, next);

    //Assert
    assert.isTrue(processWordsListSpy.calledOnce);
  });
});
