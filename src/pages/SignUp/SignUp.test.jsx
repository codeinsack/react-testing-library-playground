import SignUp from "./SignUp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Sign Up page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUp />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("has password input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has password repeat input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<SignUp />);
      const input = screen.getByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });

    it("has Sign Up button", () => {
      render(<SignUp />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });

    it("disabled the button initially", () => {
      render(<SignUp />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });
  describe("Interactions", () => {
    it("enables the button when password fields are filled and equal", () => {
      render(<SignUp />);
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      userEvent.type(passwordInput, "pass123");
      userEvent.type(passwordRepeatInput, "pass123");
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeEnabled();
    });
  });
});