const sinon = require("sinon");
const { assert, expect } = require("chai");
const bookReaderFromWebService = require("../business/bookReaderFromWeb");

describe("BookReaderFromWeb Service test", () => {
  it("service should not be undefined", () => {
    assert.notEqual(bookReaderFromWebService, undefined);
  });

  it("service should have a method readFileFromUrl", () => {
    assert.notEqual(bookReaderFromWebService.readFileFromUrl, undefined);
  });

  it("readBookFromLocal method should be called once with valid Url", async () => {
    //Arrange
    const readBookFromLocalSpy = sinon.spy(
      bookReaderFromWebService,
      "readFileFromUrl"
    );
    //Act
    await bookReaderFromWebService.readFileFromUrl("https://example.com");
    //Assert
    assert.isTrue(readBookFromLocalSpy.calledOnce);
  });

  it("readBookFromLocal method should throw error when called without Uri", async () => {
    try {
      await bookReaderFromWebService.readFileFromUrl();
    } catch (err) {
      console.log(err);
      assert.equal(err.message, "Invalid argument");
    }
  });
});
