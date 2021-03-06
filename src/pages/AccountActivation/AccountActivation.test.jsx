import { render, screen } from "@testing-library/react";
import AccountActivation from "./AccountActivation";
import { setupServer } from "msw/node";
import { rest } from "msw";

let counter = 0;
const server = setupServer(
  rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
    if (req.params.token === "5678") {
      return res(ctx.status(400));
    }
    counter += 1;
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("Account Activation Page", () => {
  const setup = (token) => {
    const match = { params: { token } };
    render(<AccountActivation match={match} />);
  };

  it("displays activation success message when token is valid", async () => {
    setup("1234");
    const message = await screen.findByText("Account is activated");
    expect(message).toBeInTheDocument();
  });

  it("sends activation request to backend", async () => {
    setup("1234");
    await screen.findByText("Account is activated");
    expect(counter).toBe(1);
  });

  it("displays spinner during activation api call", async () => {
    setup("5678");
    const spinner = screen.queryByRole("status");
    expect(spinner).toBeInTheDocument();
    await screen.findByText("Account is activated");
    expect(spinner).not.toBeInTheDocument();
  });
});
