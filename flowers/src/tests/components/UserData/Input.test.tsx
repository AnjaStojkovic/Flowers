import { Input } from "@mui/material";
import { render, screen } from "@testing-library/react";

describe("Input component", () => {
  test("renders input element when type is not textarea", () => {
    render(
      <Input
        type="text"
        // register={() => {}}
        onChange={() => {}}
        className="input-box"
        placeholder="Enter text"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders input element when type is textarea", () => {
    render(
      <Input
        type="textarea"
        // register={() => {}}
        onChange={() => {}}
        className="input-box"
        placeholder="Enter text"
      />
    );

    const textAreaElement = screen.getByPlaceholderText("Enter text");
    expect(textAreaElement).toBeInTheDocument();
  });
});
