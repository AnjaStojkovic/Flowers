import { render } from "@testing-library/react";
import Background from "../../../modules/HomePage/Background";

describe("Backgroung component", () => {
  it("renders heading text correctly", () => {
    const header1 = "Discover flowers around you";
    const header2 = "Explore between more than 8.427 sightings";

    const { getByText } = render(<Background />);

    expect(getByText(header1)).toBeInTheDocument();
    expect(getByText(header2)).toBeInTheDocument();
  });
});
