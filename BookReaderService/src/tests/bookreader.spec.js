const sinon = require("sinon");
const { assert } = require("chai");
const reader = require("../business/bookReader");

describe("Book reader Service test", () => {
  it("service should not be undefined", () => {
    assert.notEqual(reader, undefined);
  });

  it("service should have a method readFileFromUrl", () => {
    assert.notEqual(reader.readFileFromUrl, undefined);
  });

  it("readFileFromUrl method should be async", () => {
    assert.equal(reader.readFileFromUrl[Symbol.toStringTag], "AsyncFunction");
  });

  it("readFileFromUrl method should be called once with valid Url", async () => {
    //Arrange
    const readFileFromUrlSpy = sinon.spy(reader, "readFileFromUrl");
    //Act
    await reader.readFileFromUrl("http://example.com");
    //Assert
    assert.isTrue(readFileFromUrlSpy.calledOnce);
  });

  it("readFileFromUrl method should be throw error if called without parms", async () => {
    //Arrange
    //Act
    try {
      await reader.readFileFromUrl();
    } catch (error) {
      //Assert
      assert.equal(error.message, "Invalid argument");
    }
  });
});
