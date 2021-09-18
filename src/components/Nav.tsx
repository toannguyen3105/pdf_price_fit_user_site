import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";

type Props = { user: User };

const Nav: React.FC<Props> = ({ user }) => {
  const logout = async () => {
    await axios.post("logout");
  };

  return (
    <>
      <nav className="p-0 shadow navbar navbar-dark sticky-top bg-dark flex-md-nowra">
        <Link to={"/"} className="px-3 mr-0 navbar-brand col-md-3 col-lg-2">
          Company name
        </Link>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={"/profile"} className="p-2 text-white text-decoration-none">
            {user?.name}
          </Link>
          <Link
            to={"/login"}
            className="p-2 text-white text-decoration-none"
            onClick={logout}
          >
            Sign out
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
