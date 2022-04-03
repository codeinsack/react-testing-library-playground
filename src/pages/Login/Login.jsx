import Input from "../../components/Input/Input";
import { useState } from "react";
import { login } from "../../api/apiCalls";
import Spinner from "../../components/Spinner/Spinner";
import Alert from "../../components/Alert/Alert";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [failMessage, setFailMessage] = useState(null);

  let disabled = !(credentials.email && credentials.password);

  const onInputValueChange = ({ target }) => {
    setFailMessage(null);
    const { id, value } = target;
    setCredentials({
      ...credentials,
      [id]: value,
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      setFailMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
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
          {failMessage && <Alert type="danger">{failMessage}</Alert>}
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disabled || loading}
              onClick={submit}
            >
              {loading && <Spinner />}
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
