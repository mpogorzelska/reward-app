import React from "react";
import { shallow } from "enzyme";
import LoadingComponent from "../components/LoadingComponent";

describe("LoadingComponent", () => {
  it("should render 'Loading...' text", () => {
    const wrapper = shallow(<LoadingComponent />);
    expect(wrapper.text()).toBe("Loading...");
  });
});
