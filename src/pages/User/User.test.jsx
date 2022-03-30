import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import User from "./User";

const server = setupServer();

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("User Page", () => {
  beforeEach(() => {
    server.use(
      rest.get("/api/1.0/users/:id", (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            username: "user1",
            email: "user1@mail.com",
            image: null,
          })
        );
      })
    );
  });

  it("displays user name on page when user is found", async () => {
    render(<User />);
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByText("user1")).toBeInTheDocument();
    });
  });

  it("displays spinner while the api call is in progress", async () => {
    render(<User />);
    const spinner = screen.getByRole("status");
    await screen.findByText("user1");
    expect(spinner).not.toBeInTheDocument();
  });
});
