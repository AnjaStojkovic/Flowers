import { fireEvent, render } from "@testing-library/react";
import Favorite from "../../../modules/Favorites/Favorite";

describe("Favorite conponent", () => {
  test("renders with hardcoded data and calls onRemove prop correctly", () => {
    const mockOnRemove = jest.fn();

    const hardcodedData = {
      id: 1,
      flowerId: 123,
      name: "Rose",
      latinName: "Rosa",
      sightings: 10,
      profilePicture: "rose.jpg",
    };

    const { getByText, getByTestId } = render(
      <Favorite {...hardcodedData} onRemove={mockOnRemove} />
    );

    expect(getByText("Rose")).toBeInTheDocument();
    expect(getByText("Rosa")).toBeInTheDocument();
    expect(getByText("Sightings: 10")).toBeInTheDocument();

    const removeIcon = getByTestId("remove-icon");
    fireEvent.click(removeIcon);

    expect(mockOnRemove).toHaveBeenCalledWith(123, 1);
  });
});
