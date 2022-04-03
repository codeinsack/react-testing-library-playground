import Input from "../../components/Input/Input";
import { useState } from "react";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialValue);

  let disabled = !(credentials.email && credentials.password);

  const onInputValueChange = ({ target }) => {
    const { id, value } = target;
    setCredentials({
      ...credentials,
      [id]: value,
    });
  };

  return (
    <div
      data-testid="login-page"
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    >
      <form className="card">
        <div className="card-header">
          <h1 className="text-center">Login</h1>
        </div>
        <div className="card-body">
          <Input id="email" label="Email" onChange={onInputValueChange} />
          <Input
            id="password"
            label="Password"
            type="password"
            onChange={onInputValueChange}
          />
          <div className="text-center">
            <button className="btn btn-primary" disabled={disabled}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
