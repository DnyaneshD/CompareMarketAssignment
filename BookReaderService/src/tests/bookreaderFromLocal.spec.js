const sinon = require("sinon");
const { assert } = require("chai");
const bookReaderFromLocalService = require("../business/bookReaderFromLocal");

describe("BookReaderFromLocal Service test", () => {
  it("service should not be undefined", () => {
    assert.notEqual(bookReaderFromLocalService, undefined);
  });

  it("service should have a method readBookFromLocal", () => {
    assert.notEqual(bookReaderFromLocalService.readBookFromLocal, undefined);
  });

  it("readBookFromLocal method should be called once", async () => {
    //Arrange
    const readBookFromLocalSpy = sinon.spy(
      bookReaderFromLocalService,
      "readBookFromLocal"
    );
    //Act
    await bookReaderFromLocalService.readBookFromLocal();
    //Assert
    assert.isTrue(readBookFromLocalSpy.calledOnce);
  });
});
