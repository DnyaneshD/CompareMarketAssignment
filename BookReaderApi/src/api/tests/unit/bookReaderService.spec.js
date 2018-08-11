// const sinon = require("sinon");
// const { assert } = require("chai");
// const service = require("../../services/bookReader");

// describe("Book reader Service test", () => {
//   it("service should not be undefined", () => {
//     assert.notEqual(service, undefined);
//   });

//   it("service should have a method readSteamFromUrl", () => {
//     assert.notEqual(service.readSteamFromUrl, undefined);
//   });

//   it("readSteamFromUrl method should be async", () => {
//     assert.equal(service.readSteamFromUrl[Symbol.toStringTag], "AsyncFunction");
//   });

//   it("readSteamFromUrl method should be called once with valid Url", async () => {
//     //Arrange
//     const readSteamFromUrlSpy = sinon.spy(service, "readSteamFromUrl");
//     //Act
//     await service.readSteamFromUrl("http:example.com");
//     //Assert
//     assert.isTrue(readSteamFromUrlSpy.calledOnce);
//   });

//   it("readSteamFromUrl method should be throw error if called without parms", async () => {
//     //Arrange
//     //Act
//     try {
//       await service.readSteamFromUrl();
//     } catch (error) {
//       //Assert
//       assert.equal(error.message, "Invalid argument");
//     }
//   });
// });
