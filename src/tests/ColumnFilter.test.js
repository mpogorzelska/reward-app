import React from "react";
import { shallow } from "enzyme";
import ColumnFilter from "../components/ColumnFilter";

describe("ColumnFilter", () => {
  it("should render an input element", () => {
    const column = {
      filterValue: "Test Filter",
      setFilter: jest.fn(),
    };

    const wrapper = shallow(<ColumnFilter column={column} />);
    const input = wrapper.find("input");
    expect(input).toHaveLength(1);
  });

  it("should set filter value on input change", () => {
    const column = {
      filterValue: "Test Filter",
      setFilter: jest.fn(),
    };

    const wrapper = shallow(<ColumnFilter column={column} />);
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "New Filter" } });

    expect(column.setFilter).toHaveBeenCalledWith("New Filter");
  });

  it("should render input with placeholder", () => {
    const column = {
      filterValue: "",
      setFilter: jest.fn(),
    };

    const wrapper = shallow(<ColumnFilter column={column} />);
    const input = wrapper.find("input");

    expect(input.prop("placeholder")).toEqual("Filter...");
  });
});
