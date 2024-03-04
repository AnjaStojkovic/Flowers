import { render } from "@testing-library/react";
import Settings from "../../components/Settings";

describe("Settings component", () => {
  it("renders without errors", () => {
    render(<Settings />);
  });

  it("renders all necessary subcomponents", () => {
    const { getByText, getByAltText } = render(<Settings />);

    expect(getByText("Settings")).toBeInTheDocument();
    expect(getByAltText("icon")).toBeInTheDocument();
    expect(
      getByText("Select favorite flower sightings radious for notifications")
    ).toBeInTheDocument();
    expect(getByText("1km")).toBeInTheDocument();
    expect(getByText("5km")).toBeInTheDocument();
    expect(getByText("10km")).toBeInTheDocument();
    expect(getByText("Save settings")).toBeInTheDocument();
  });
});
