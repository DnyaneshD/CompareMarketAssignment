const sinon = require("sinon");
const { assert } = require("chai");
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
});
