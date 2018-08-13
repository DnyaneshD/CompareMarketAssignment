const { assert } = require("chai");
const dbService = require("../../services/db");

describe("DB Service test", () => {
  it("dbService should not be undefined", () => {
    assert.notEqual(dbService, undefined);
  });

  it("dbService should have a find method", () => {
    assert.notEqual(dbService.find, undefined);
  });

  it("find method should be async", () => {
    assert.equal(dbService.find[Symbol.toStringTag], "AsyncFunction");
  });

  // it("find method should be called once", async () => {
  //   //Arrange
  //   const skip = 0;
  //   const limit = 0;

  //   dbService.collectionName = "test";

  //   const findSpy = sinon.spy(dbService, "find");

  //   //Act
  //   await dbService.find(skip, limit);

  //   //Assert
  //   assert.isTrue(findSpy.calledOnce);
  // });

  it("service should have a setCollectionName method", () => {
    assert.notEqual(dbService.setCollectionName, undefined);
  });
});
