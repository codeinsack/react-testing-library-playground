import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      await axios.post("/api/1.0/users", body);
      setSignUpSuccess(true);
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      {!signUpSuccess && (
        <form
          data-testid="form-sign-up"
          className="card mt-5"
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
                  ? "Password mismatch"
                  : ""
              }
              onChange={onInputValueChange}
            />
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={disabled || apiProgress}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                )}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <div className="alert alert-success mt-3">
          Please check your e-mail to activate your account
        </div>
      )}
    </div>
  );
};

export default SignUp;
