import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("users/info", {
      first_name: firstName,
      last_name: lastName,
      email,
    });
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("users/password", {
      password,
      password_confirm: passwordConfirm,
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("user");

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    })();
  }, []);

  return (
    <Wrapper>
      <div className="mb-3">
        <h3>Account Information</h3>

        <form onSubmit={infoSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              defaultValue={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </div>

      <div className="mb-3">
        <h3>Change Password</h3>

        <form onSubmit={passwordSubmit}>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              onChange={({ target }) => setPasswordConfirm(target.value)}
            />
          </div>

          <button className="btn btn-outline-secondary">Save</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Profile;
