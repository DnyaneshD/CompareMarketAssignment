import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PropertyDetailsComponent from "./propertyDetailsComponent";

Enzyme.configure({ adapter: new Adapter() });
describe("Header Component", () => {
  let props = {
    name: "Hello",
    desciption: "Test"
  };
  let mountedPropertyDetailsComponent;
  const propertyComponent = () => {
    if (!mountedPropertyDetailsComponent) {
      mountedPropertyDetailsComponent = mount(
        <PropertyDetailsComponent property={props} />
      );
    }
    return mountedPropertyDetailsComponent;
  };

  beforeEach(() => {
    props = {
      onInputChangeEvent: undefined
    };
    mountedPropertyDetailsComponent = undefined;
  });

  it("always renders a div", () => {
    const divs = propertyComponent().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
