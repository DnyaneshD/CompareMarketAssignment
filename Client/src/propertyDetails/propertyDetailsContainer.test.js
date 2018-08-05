import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PropertyDetailsContainer from "./propertyDetailsContainer";

Enzyme.configure({ adapter: new Adapter() });
describe("Header Component", () => {
  let props = {
    searchTerm: ""
  };
  let mountedPropertyDetailsContainer;
  const propertyDetailsContainer = () => {
    if (!mountedPropertyDetailsContainer) {
      mountedPropertyDetailsContainer = mount(
        <PropertyDetailsContainer property={props} />
      );
    }
    return mountedPropertyDetailsContainer;
  };

  beforeEach(() => {
    props = {
      searchTerm: ""
    };
    mountedPropertyDetailsContainer = undefined;
  });

  it("hasError should be false", () => {
    const container = shallow(<PropertyDetailsContainer searchTerm={"Cha"} />);

    expect(container.state().hasError).toEqual(false);
  });

  it("noResultFound should be false", () => {
    const container = shallow(<PropertyDetailsContainer searchTerm={"Cha"} />);

    expect(container.state().noResultMatch).toEqual(false);
  });
});
