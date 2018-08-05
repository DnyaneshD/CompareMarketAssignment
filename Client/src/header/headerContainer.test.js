import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import HeaderContainer from "./headerContainer";

Enzyme.configure({ adapter: new Adapter() });
describe("Header Component", () => {
  let props;
  let mountedHeaderContainer;
  const headerContainer = () => {
    if (!mountedHeaderContainer) {
      mountedHeaderContainer = mount(<HeaderContainer {...props} />);
    }
    return mountedHeaderContainer;
  };

  beforeEach(() => {
    props = {
      onInputChangeEvent: undefined
    };
    mountedHeaderContainer = undefined;
  });

  it("always renders a div", () => {
    const divs = headerContainer().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("OnInputChange should be called on text change", () => {
    const onInputChange = term => {
      expect(term).toEqual("Hello Test");
    };

    const container = shallow(
      <HeaderContainer onSearchTermChange={onInputChange} />
    );
    container
      .dive()
      .find("input")
      .simulate("change", { target: { value: "Hello Test" } });
  });
});
