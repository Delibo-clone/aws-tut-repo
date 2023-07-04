import { useState } from "react";
import { signIn, getCurrentUser } from "./auth";
import ForgotPassword from "./forgotpassward";
import axios from "axios";
import ToDoList from "./to-do-list";

async function setToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}

export default function LoginPage() {
  const [userName, setUsername] = useState("");
  const [pswd, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userProfile, showUserProfiole] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const tokens = await signIn(userName, pswd);
      const userDetail = await getCurrentUser();
      setToken(tokens.idToken.jwtToken).then(() => {
        const { sub, given_name, email } = userDetail;
        axios
          .post(
            `https://xoxrtp6j2a.execute-api.ap-south-1.amazonaws.com/dev/create-user?id=${sub}&name=${given_name}&email=${email}`
          )
          .then((re) => {
            showUserProfiole(true);
            console.log("data stored",re.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ position: "relative" }} className="mt-2 mb-3">
      {!userProfile ? (
        <>
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={userName}
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={pswd}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p
                onClick={() => {
                  document.getElementsByClassName(
                    "forgot-pswd"
                  )[0].style.display = "block";
                }}
                className="forgot-pswd-txt"
              >
                forgot password ?
              </p>
            </div>
            <button className="btn btn-dark" type="submit">
              Login
            </button>
          </form>
        </>
      ) : (
        <ToDoList />
      )}
      <ForgotPassword />
      {error && (
        <p id="err" className="mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
