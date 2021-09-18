import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

type Props = {
  match: any;
};

const UserEdit: React.FC<Props> = ({ match }) => {
  const id: number = match.params.id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`users/${id}`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role_id: parseInt(roleId),
    });

    setRedirect(true);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get("roles");
      setRoles(response.data);

      const { data } = await axios.get(`users/${id}`);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleId(data.role.id);
    })();
  }, [id]);

  if (redirect) {
    return <Redirect to="/users" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default UserEdit;
