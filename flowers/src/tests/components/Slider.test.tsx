import { render, fireEvent } from "@testing-library/react";
import MySlider from "../../components/MySlider";

describe("Slider component", () => {
  it("updates slider value on change", () => {
    const { getByRole } = render(<MySlider />);

    const slider = getByRole("slider");

    expect(slider).toHaveAttribute("value", "0");

    fireEvent.change(slider, { target: { value: 5 } });

    expect(slider).toHaveAttribute("value", "5");
  });
});
