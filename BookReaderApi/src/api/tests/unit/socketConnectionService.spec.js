const sinon = require("sinon");
const { assert } = require("chai");
const service = require("../../services/socketConnection");

describe("Socket connection Service test", () => {
  it("service should not be undefined", () => {
    assert.notEqual(service, undefined);
  });

  it("service should have a method registerSocketService", () => {
    assert.notEqual(service.registerSocketService, undefined);
  });

  it("service should have a method notifyClient", () => {
    assert.notEqual(service.notifyClient, undefined);
  });

  it("registerSocketService method should be called once", async () => {
    //Arrange
    const server = {};

    const registerSocketServiceSpy = sinon.spy(
      service,
      "registerSocketService"
    );

    //Act
    await service.registerSocketService(server);

    //Assert
    assert.isTrue(registerSocketServiceSpy.calledOnce);
  });
});
