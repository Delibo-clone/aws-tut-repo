import { useState } from "react";
import { confirmSignUp } from "./auth";

export default function ConfirmSignUp({ msg }) {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await confirmSignUp(username, code);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials. Go rock that app!</p>
      </div>
    );
  }

  return (
    <div className="mt-2 mb-3">
      <h2>CONFIRM SIGN UP</h2>
      {msg ? (
        <p className="suc">Give verification code for confirmation</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Email"
            value={username}
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Confirmation code"
            className="form-control"
            id="exampleInputEmail1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <button className="btn btn-dark" type="submit">
          Confirm
        </button>
      </form>
      {error && (
        <p id="err" className="mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
