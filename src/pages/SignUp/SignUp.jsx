import React, { useEffect, useState } from "react";

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  useEffect(() => {
    if (password && passwordRepeat && password === passwordRepeat) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, passwordRepeat]);

  return (
    <div>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" type="text" />
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
    </div>
  );
};

export default SignUp;
