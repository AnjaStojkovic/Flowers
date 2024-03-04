import { render, fireEvent, getByLabelText } from "@testing-library/react";
import MySwitch from "../../components/MySwitch";

describe("MySwitch component", () => {
  it("updates slider value on change", () => {
    const { getByLabelText } = render(<MySwitch />);

    const switchElement = getByLabelText("Turn notifications");

    expect(switchElement).not.toBeChecked();

    fireEvent.click(switchElement);

    expect(switchElement).toBeChecked();
  });
});
