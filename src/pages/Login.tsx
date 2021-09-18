import { SyntheticEvent, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const getFullYear = () => new Date().getFullYear();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const data = await axios.post("/login", {
        username,
        password,
      });
      setRedirect(true);

      window.localStorage.setItem("access_token", data?.data?.access_token);
    } catch (error: any) {
      console.log(JSON.parse(error.request.response).message);
    }
  };

  if (redirect) {
    return <Redirect to={"/products"} />;
  }

  return (
    <div className={styles.wrapperContainer}>
      <main className={`${styles.formSignIn}`}>
        <form onSubmit={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="57"
            fill="currentColor"
            className="bi bi-window-dock"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 5H1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5zm0-1H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1zm1-1a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3z"
            />
            <path d="M3 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
          </svg>
          <h1 className="mb-3 h3 fw-normal">Please sign in</h1>

          <div className={`form-floating ${styles.formFloating}`}>
            <input
              type="username"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={({ target }) => setUsername(target.value)}
              required
            />
            <label>Username</label>
          </div>

          <div className={`mb-3 form-floating ${styles.formFloating}`}>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017–{getFullYear()}</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
