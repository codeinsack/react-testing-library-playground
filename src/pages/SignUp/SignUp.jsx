import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);

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
    await axios.post("/api/1.0/users", body);
  };

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <form className="card mt-5" onSubmit={onSubmit}>
        <div className="card-header">
          <h1 className="text-center">Sign Up</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              value={password}
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
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
    </div>
  );
};

export default SignUp;
