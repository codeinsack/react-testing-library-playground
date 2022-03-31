import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

const server = setupServer(
  rest.post("/api/1.0/users", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("Login Page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<Login />);
      const header = screen.queryByRole("heading", { name: "Login" });
      expect(header).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<Login />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("has password input", () => {
      render(<Login />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<Login />);
      const input = screen.getByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has Login button", () => {
      render(<Login />);
      const button = screen.queryByRole("button", { name: "Login" });
      expect(button).toBeInTheDocument();
    });

    it("disabled the button initially", () => {
      render(<Login />);
      const button = screen.queryByRole("button", { name: "Login" });
      expect(button).toBeDisabled();
    });
  });
});
