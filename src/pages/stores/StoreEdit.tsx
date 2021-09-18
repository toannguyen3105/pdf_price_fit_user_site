import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";

type Props = {
  match: any;
};

const RoleEdit: React.FC<Props> = ({ match }) => {
  const id: number = match.params.id;

  const [name, setName] = useState("");
  const [cookies, setCookies] = useState("");
  const [csrf_token, setCsrfToken] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`/stores/${id}`, {
      cookies,
      csrf_token,
    });

    setRedirect(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/stores/${id}`);
      setName(data?.data?.store_name);
      setCookies(data?.data?.cookies);
      setCsrfToken(data?.data?.csrf_token);
    })();
  }, [id]);

  if (redirect) {
    return <Redirect to="/stores" />;
  }

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mt-3 mb-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="mt-3 mb-3 row">
          <label className="col-sm-2 col-form-label">Cookies</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              defaultValue={cookies}
              onChange={(e) => setCookies(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-3 mb-3 row">
          <label className="col-sm-2 col-form-label">CSRF_TOKEN</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              defaultValue={csrf_token}
              onChange={(e) => setCsrfToken(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleEdit;
