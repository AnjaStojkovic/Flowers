import { render, screen } from "@testing-library/react";
import BackgroundDetails from "../../../modules/FlowerDetails/BackgroundDetails";
import { Route, BrowserRouter as Router } from "react-router-dom";

describe("BackgroundDetails component", () => {
  it("renders component with hardcoded data", () => {
    const flowerData = {
      name: "Rose",
      latin_name: "Rosa",
      sightings: 10,
    };

    render(
      <Router>
        <BackgroundDetails
          name={flowerData.name}
          latin_name={flowerData.latin_name}
          sightings={flowerData.sightings}
        />
      </Router>
    );

    const nameElement = screen.getByText(flowerData.name);
    expect(nameElement).toBeInTheDocument();

    const latinNameElement = screen.getByText(flowerData.latin_name);
    expect(latinNameElement).toBeInTheDocument();

    const sightingElement = screen.getByText(
      `Sightings: ${flowerData.sightings}`
    );

    const addButtonElement = screen.getByRole("button", {
      name: "+Add New Sighting",
    });
    expect(addButtonElement).toBeInTheDocument();
  });
});
