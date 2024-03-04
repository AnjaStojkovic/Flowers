import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/Buttons/Button";

describe("Button component", () => {
  test("renders button with text correctly", () => {
    const buttonText = "Click me";
    const mockOnClick = jest.fn();

    render(<Button text={buttonText} onClick={mockOnClick} />);

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("renders button with optional className", () => {
    const buttonText = "Submit";
    const className = "custom-button";
    const mockOnClick = jest.fn();

    render(
      <Button text={buttonText} onClick={mockOnClick} className={className} />
    );

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toHaveClass(className);
  });
});
