import { useState, useEffect } from "react";
import { signIn } from "./auth";
import { getCurrentUser } from "./auth";
import ForgotPassword from "./forgotpassward";
function UserProfile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const cleanUp = true;
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (cleanUp) {
          console.log(user);
          setUser(user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    return () => (cleanUp = false);
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.family_name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
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
      await signIn(userName, pswd);
      showUserProfiole(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{position:"relative"}} className="mt-2 mb-3">
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
              <p onClick={()=>{
                document.getElementsByClassName("forgot-pswd")[0].style.display = "block";
              }} className="forgot-pswd-txt">forgot password ?</p>
            </div>
            <button className="btn btn-dark" type="submit">
              Login
            </button>
          </form>
        </>
      ) : (
        <UserProfile />
      )}
      <ForgotPassword/>
      {error && (
        <p id="err" className="mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
