import { render } from "@testing-library/react";
import NotFound from "../../modules/NotFound";

describe("NotFound component", () => {
  it("renders without errors", () => {
    const { getByText } = render(<NotFound />);

    const notFoundText = getByText("404 - Page not found");

    expect(notFoundText).toBeInTheDocument();
  });
});
