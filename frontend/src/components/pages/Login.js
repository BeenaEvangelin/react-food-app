import { Link } from "react-router-dom";
import AuthenticationPage from "./Authentication";
const Login = () => {
  return (
    <>
      <p>
        Go to <Link to="/"> home page</Link>
      </p>
      <AuthenticationPage />
    </>
  );
};

export default Login;
