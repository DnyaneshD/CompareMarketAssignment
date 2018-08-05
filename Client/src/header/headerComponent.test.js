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

  it("OnInputChange should be called on text change", () => {
    const onInputChange = term => {
      expect(term).toEqual("Hello");
    };

    const component = shallow(
      <HeaderComponent onInputChangeEvent={onInputChange} />
    );
    component.find("input").simulate("change", { target: { value: "Hello" } });
  });

  it("State should be changed on text change", () => {
    const onInputChange = term => {};

    const component = shallow(
      <HeaderComponent onInputChangeEvent={onInputChange} />
    );
    component
      .find("input")
      .simulate("change", { target: { value: "Hello Test" } });

    expect(component.state().seachTerm).toEqual("Hello Test");
  });

  it("State should be changed to null", () => {
    const onInputChange = term => {};

    const component = shallow(
      <HeaderComponent onInputChangeEvent={onInputChange} />
    );

    component
      .find("input")
      .simulate("change", { target: { value: "Hello Test" } });

    component.find("input").simulate("change", { target: { value: "" } });

    expect(component.state().seachTerm).toEqual("");
  });
});
