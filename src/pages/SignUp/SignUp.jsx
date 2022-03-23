import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

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
    await axios.post("/api/1.0/users", body);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          value={passwordRepeat}
          id="passwordRepeat"
          type="password"
          onChange={(event) => setPasswordRepeat(event.target.value)}
        />
        <button disabled={disabled}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
