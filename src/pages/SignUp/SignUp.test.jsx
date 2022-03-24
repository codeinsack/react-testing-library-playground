import SignUp from "./SignUp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

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
    let button;
    const setup = () => {
      render(<SignUp />);
      const usernameInput = screen.getByLabelText("Username");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      userEvent.type(passwordInput, "pass123");
      userEvent.type(passwordRepeatInput, "pass123");
      userEvent.type(usernameInput, "Rind");
      userEvent.type(emailInput, "test@mail.io");
      button = screen.queryByRole("button", { name: "Sign Up" });
    };

    it("enables the button when password fields are filled and equal", () => {
      setup();
      expect(button).toBeEnabled();
    });

    it("sends username, email, password to backend after clicking the button", async () => {
      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      userEvent.click(button);

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(requestBody).toEqual({
        username: "Rind",
        email: "test@mail.io",
        password: "pass123",
      });
    });

    it("disables button when there is an ongoing api call", async () => {
      let counter = 0;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          counter += 1;
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      userEvent.click(button);
      userEvent.click(button);

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(counter).toBe(1);
    });

    it("displays spinner after clicking the submit", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      userEvent.click(button);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });
  });
});
