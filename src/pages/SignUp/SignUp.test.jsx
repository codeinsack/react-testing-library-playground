import SignUp from "./SignUp";
import { render, screen } from "@testing-library/react";

it("has header", () => {
  render(<SignUp />);
  const header = screen.queryByRole("heading", { name: "Sign Up" });
  expect(header).toBeInTheDocument();
});
