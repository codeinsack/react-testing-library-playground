import SignUp from "./SignUp";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import i18n from "../../locale/i18n";
import en from "../../locale/en.json";
import ru from "../../locale/ru.json";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";

let requestBody;
let counter = 0;
let acceptLanguageHeader;
const server = setupServer(
  rest.post("/api/1.0/users", (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    acceptLanguageHeader = req.headers.get("Accept-Language");
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

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
    let button, usernameInput, emailInput, passwordInput, passwordRepeatInput;
    const setup = () => {
      render(<SignUp />);
      usernameInput = screen.getByLabelText("Username");
      emailInput = screen.getByLabelText("Email");
      passwordInput = screen.getByLabelText("Password");
      passwordRepeatInput = screen.getByLabelText("Password Repeat");
      userEvent.type(usernameInput, "Rind");
      userEvent.type(emailInput, "test@mail.io");
      userEvent.type(passwordInput, "pass123");
      userEvent.type(passwordRepeatInput, "pass123");
      button = screen.queryByRole("button", { name: "Sign Up" });
    };

    it("enables the button when password fields are filled and equal", () => {
      setup();
      expect(button).toBeEnabled();
    });

    it("sends username, email, password to backend after clicking the button", async () => {
      setup();
      userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(requestBody).toEqual({
        username: "Rind",
        email: "test@mail.io",
        password: "pass123",
      });
    });

    it("disables button when there is an ongoing api call", async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(counter).toBe(1);
    });

    it("displays spinner after clicking the submit", async () => {
      setup();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      userEvent.click(button);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
    });

    it("displays account activation notification after successful sign up request", async () => {
      setup();
      const message = "Please check your e-mail to activate your account";
      expect(screen.queryByText(message)).not.toBeInTheDocument();
      userEvent.click(button);
      const text = await screen.findByText(message);
      expect(text).toBeInTheDocument();
    });

    it("hides sign up form after successful sign up request", async () => {
      setup();
      const form = screen.getByTestId("form-sign-up");
      userEvent.click(button);
      // await waitFor(() => {
      //   expect(form).not.toBeInTheDocument();
      // });
      await waitForElementToBeRemoved(form);
    });

    const generateValidationError = (field, message) =>
      rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: {
              [field]: message,
            },
          })
        );
      });

    it.each`
      field         | message
      ${"username"} | ${"Username cannot be null"}
      ${"email"}    | ${"E-mail cannot be null"}
      ${"password"} | ${"Password cannot be null"}
    `("displays $message for $field", async ({ field, message }) => {
      server.use(generateValidationError(field, message));
      setup();
      userEvent.click(button);
      const validationError = await screen.findByText(message);
      expect(validationError).toBeInTheDocument();
    });

    it("hides spinner and enables button after response received", async () => {
      server.use(
        generateValidationError("username", "Username cannot be null")
      );
      setup();
      userEvent.click(button);
      await screen.findByText("Username cannot be null");
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it("displays mismatch message for password repeat input", () => {
      setup();
      userEvent.type(passwordInput, "pass12345");
      userEvent.type(passwordRepeatInput, "pass123");
      const validationError = screen.queryByText("Password mismatch");
      expect(validationError).toBeInTheDocument();
    });

    it.each`
      field         | message                       | label
      ${"username"} | ${"Username can not be null"} | ${"Username"}
      ${"email"}    | ${"Email can not be null"}    | ${"Email"}
      ${"password"} | ${"Password can not be null"} | ${"Password"}
    `(
      "clears validation error after $field is updated",
      async ({ field, message, label }) => {
        server.use(generateValidationError(field, message));
        setup();
        userEvent.click(button);
        const validationError = await screen.findByText(message);
        userEvent.type(screen.getByLabelText(label), "updated");
        expect(validationError).not.toBeInTheDocument();
      }
    );
  });
  describe("Internationalization", () => {
    let russianToggle, englishToggle, passwordInput, passwordRepeatInput;
    const setup = () => {
      render(
        <>
          <SignUp />
          <LanguageSelector />
        </>
      );
      russianToggle = screen.getByTitle("Russian");
      englishToggle = screen.getByTitle("English");
      passwordInput = screen.getByLabelText(en.password);
      passwordRepeatInput = screen.getByLabelText(en.passwordRepeat);
    };

    afterEach(() => {
      act(() => {
        i18n.changeLanguage("en");
      });
    });

    it("initially displays all text in English", () => {
      setup();
      expect(
        screen.getByRole("heading", { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });

    it("displays all text in Russian after changing the language", () => {
      setup();
      userEvent.click(russianToggle);

      expect(
        screen.getByRole("heading", { name: ru.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: ru.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(ru.username)).toBeInTheDocument();
      expect(screen.getByLabelText(ru.email)).toBeInTheDocument();
      expect(screen.getByLabelText(ru.password)).toBeInTheDocument();
      expect(screen.getByLabelText(ru.passwordRepeat)).toBeInTheDocument();
    });

    it("displays all text in English after changing back from Russian", () => {
      setup();
      userEvent.click(russianToggle);
      userEvent.click(englishToggle);

      expect(
        screen.getByRole("heading", { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });

    it("displays password mismatch validation in Russian", () => {
      setup();
      userEvent.click(russianToggle);

      userEvent.type(passwordInput, "Pass1234567");
      const validationMessageInRussian = screen.queryByText(
        ru.passwordMismatchValidation
      );
      expect(validationMessageInRussian).toBeInTheDocument();
    });

    it("sends accept language header as en for outgoing request", async () => {
      setup();
      userEvent.type(passwordInput, "pass123");
      userEvent.type(passwordRepeatInput, "pass123");
      const button = screen.getByRole("button", { name: en.signUp });
      const form = screen.getByTestId("form-sign-up");
      userEvent.click(button);
      await waitForElementToBeRemoved(form);
      expect(acceptLanguageHeader).toBe("en");
    });

    it("sends accept language header as ru for outgoing request after selecting this language", async () => {
      setup();
      userEvent.type(passwordInput, "pass123");
      userEvent.type(passwordRepeatInput, "pass123");
      const button = screen.getByRole("button", { name: en.signUp });
      userEvent.click(russianToggle);
      const form = screen.getByTestId("form-sign-up");
      userEvent.click(button);
      await waitForElementToBeRemoved(form);
      expect(acceptLanguageHeader).toBe("ru");
    });
  });
});
