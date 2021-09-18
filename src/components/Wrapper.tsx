import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { User } from "../models/user";
import Menu from "./Menu";
import Nav from "./Nav";

type Props = { children: React.ReactNode };

const Wrapper: React.FC<Props> = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/profile");

        setUser(
          new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
          )
        );
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <Nav user={user} />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
