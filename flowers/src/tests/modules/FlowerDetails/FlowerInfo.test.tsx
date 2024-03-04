import { render } from "@testing-library/react";
import FlowerInfo from "../../../modules/FlowerDetails/FlowerInfo";

describe("FlowerInfo component", () => {
  it("renders description text correctly", () => {
    const descriptionText = "This is a flower description.";

    const { getByText } = render(<FlowerInfo description={descriptionText} />);

    expect(getByText(descriptionText)).toBeInTheDocument();
  });

  it("renders basic information headings", () => {
    const { getByText } = render(<FlowerInfo description="Description" />);

    expect(getByText("Kingdom:")).toBeInTheDocument();
    expect(getByText("Order:")).toBeInTheDocument();
    expect(getByText("Family:")).toBeInTheDocument();
    expect(getByText("Species:")).toBeInTheDocument();
  });
});
