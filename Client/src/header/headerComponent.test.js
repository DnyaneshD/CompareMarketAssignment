import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import HeaderComponent from "./headerComponent";

Enzyme.configure({ adapter: new Adapter() });
describe("Header Component", () => {
  let props;
  let mountedHeaderComponent;
  const headerComponent = () => {
    if (!mountedHeaderComponent) {
      mountedHeaderComponent = mount(<HeaderComponent {...props} />);
    }
    return mountedHeaderComponent;
  };

  beforeEach(() => {
    props = {
      onInputChangeEvent: undefined
    };
    mountedHeaderComponent = undefined;
  });

  it("always renders a div", () => {
    const divs = headerComponent().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});
