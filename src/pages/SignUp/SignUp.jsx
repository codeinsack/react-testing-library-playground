import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (password && passwordRepeat && password === passwordRepeat) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, passwordRepeat]);

  const onSubmit = async (event) => {
    event.preventDefault();
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
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Username"
              help={errors.username}
              onChange={setUsername}
            />
            <Input
              id="email"
              label="Email"
              help={errors.email}
              onChange={setEmail}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              help={errors.password}
              onChange={setPassword}
            />
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordRepeat">
                Password Repeat
              </label>
              <input
                className="form-control"
                value={passwordRepeat}
                id="passwordRepeat"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
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
                Sign Up
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
