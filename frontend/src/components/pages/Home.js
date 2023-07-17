import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>
        Go to <Link to="/login"> the login page</Link>
      </p>
    </>
  );
};
export default HomePage;
