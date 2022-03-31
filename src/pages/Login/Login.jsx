import Input from "../../components/Input/Input";

const Login = () => {
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
          <Input id="email" label="Email" />
          <Input id="password" label="Password" type="password" />
          <div className="text-center">
            <button className="btn btn-primary" disabled>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
