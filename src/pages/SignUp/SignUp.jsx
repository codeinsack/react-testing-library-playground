import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input/Input";
import { useTranslation } from "react-i18next";
import { signUp } from "../../api/apiCalls";
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import useHover from "../../hooks/useHover";

const initialValue = {
  username: "",
  email: "",
  password: "",
  passwordRepeat: "",
};

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [credentials, setCredentials] = useState(initialValue);
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [node, setNode] = useState(null);
  const { t } = useTranslation();
  const ref = useRef();
  const on = useHover(node);

  useEffect(() => {
    setNode(ref.current);
  }, []);

  useEffect(() => {
    const { password, passwordRepeat } = credentials;
    if (password && passwordRepeat && password === passwordRepeat) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [credentials.password, credentials.passwordRepeat]);

  const onInputValueChange = ({ target }) => {
    const { id, value } = target;
    const errorsCopy = { ...errors };
    delete errorsCopy[id];
    setCredentials({
      ...credentials,
      [id]: value,
    });
    setErrors(errorsCopy);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = credentials;
    const body = {
      username,
      email,
      password,
    };
    setApiProgress(true);
    try {
      await signUp(body);
      setSignUpSuccess(true);
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
    } finally {
      setApiProgress(false);
    }
  };

  let style = {};

  if (on) {
    style = {
      border: "1px solid red",
    };
  }

  return (
    <div
      data-testid="signup-page"
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      style={style}
    >
      {!signUpSuccess && (
        <form
          ref={ref}
          data-testid="form-sign-up"
          className="card "
          onSubmit={onSubmit}
        >
          <div className="card-header">
            <h1 className="text-center">{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              help={errors.username}
              onChange={onInputValueChange}
            />
            <Input
              id="email"
              label={t("email")}
              help={errors.email}
              onChange={onInputValueChange}
            />
            <Input
              id="password"
              label={t("password")}
              type="password"
              help={errors.password}
              onChange={onInputValueChange}
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              type="password"
              help={
                credentials.password !== credentials.passwordRepeat
                  ? t("passwordMismatchValidation")
                  : ""
              }
              onChange={onInputValueChange}
            />
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={disabled || apiProgress}
              >
                {apiProgress && <Spinner />}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <Alert>Please check your e-mail to activate your account</Alert>
      )}
    </div>
  );
};

export default SignUp;
