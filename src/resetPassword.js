import { useState } from "react";
import { confirmPassword } from "./auth";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let a = await confirmPassword(username, confirmationCode, newPassword);
      console.log(a);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="">
        <h2>Reset password</h2>
        <p>Your password has been reset successfully!</p>
        <button
          className="btn btn-dark mt-2"
          onClick={() => {
            document.getElementsByClassName("forgot-pswd")[0].style.display =
              "none";
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-1 mb-1">
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-1 mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </div>
        <div className="mt-1 mb1-3">
          <input
            type="password"
            className="form-control"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-dark mt-2" type="submit">
          Submit
        </button>
      </form>
      <p
        className="hover-style"
        onClick={() => {
          document.getElementsByClassName("forgot-pswd")[0].style.display =
            "none";
        }}
      >
        Back
      </p>
      {error && <p>{error}</p>}
    </div>
  );
}
