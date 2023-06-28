import { useState } from "react";
import { signUp } from "./auth";
function SuccessMsg({ back }) {
  return (
    <div className="show-suc-msg">
      <p className="h4">Successfully Email Sent 😊</p>
      <button className="btn btn-dark" onClick={back}>
        Back
      </button>
    </div>
  );
}
export default function SignUp({ giveSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, showSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(username, email, password);
      showSuccessMsg(true);
      giveSuccess();
    } catch (err) {
      setError(err.message);
    }
  };
  const backToPage = () => showSuccessMsg(false);
  return (
    <div className="mb-3 mt-2">
      {!successMsg ? (
        <>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                id="exampleInputEmail1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="form-control"
                id="exampleInputEmail1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="exampleInputEmail1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-dark" type="submit">
              SignUp
            </button>
          </form>
        </>
      ) : (
        <SuccessMsg back={backToPage} />
      )}
      {error && (
        <p id="err" className="mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
