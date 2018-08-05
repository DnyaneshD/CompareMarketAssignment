import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PropertyComponent from "./propertyComponent";

Enzyme.configure({ adapter: new Adapter() });
describe("Header Component", () => {
  let props = {
    name: "Hello",
    desciption: "Test"
  };
  let mountedPropertyComponent;
  const propertyComponent = () => {
    if (!mountedPropertyComponent) {
      mountedPropertyComponent = mount(<PropertyComponent property={props} />);
    }
    return mountedPropertyComponent;
  };

  beforeEach(() => {
    props = {
      onInputChangeEvent: undefined
    };
    mountedPropertyComponent = undefined;
  });

  it("always renders a div", () => {
    const divs = propertyComponent().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
