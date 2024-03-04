import { render } from "@testing-library/react";
import Header from "../../../modules/SightingList/Header";

describe("Header component", () => {
  it("renders heading text correctly", () => {
    const header1 = "Sighting List";
    const header2 = "Explore between more than 8,427 sightings";

    const { getByText } = render(<Header />);

    expect(getByText(header1)).toBeInTheDocument();
    expect(getByText(header2)).toBeInTheDocument();
  });
});
