import { useState } from "react";
import { forgotPassword } from "./auth";
import ResetPassword from "./resetPassword";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
     await forgotPassword(username);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className=" mb-3 forgot-pswd">
        <ResetPassword />
      </div>
    );
  }

  return (
    <div className="mt-1 mb-3 forgot-pswd">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </form>
      <button
        className="btn btn-dark mt-2"
        onClick={() => {
          document.getElementsByClassName("forgot-pswd")[0].style.display =
            "none";
        }}
      >
        Back
      </button>
      {error && (
        <p id="err" className="mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
