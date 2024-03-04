import { render, screen } from "@testing-library/react";
import UserInfoItem from "../../../components/UserData/UserInfoItem";

describe("UserInfoComponent", () => {
    test("renders label and value correctly", () => {
        const label = "First name";
        const value = "John";

        render(<UserInfoItem label={label} value={value} />)

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    })
})