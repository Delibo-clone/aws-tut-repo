import SignUp from "./SignUp";
import LoginPage from "./Login";
import React, { useState } from "react";
import ConfirmSignUp from "./ConfirmSignUp";
import "./styles.css";
function App() {
  const [success, giveSuccess] = useState(false);
  const successMsg = () => giveSuccess(!success);
  return (
    <div className="container">
      <div className="row row-cols-2 ">
        <div className="col p-4">
          <div className="row">
            <div className="col-10  br">
              <SignUp giveSuccess={successMsg} />
            </div>
          </div>
        </div>
        <div className="col p-4">
          <div className="row">
            <div className="col-10  br">
              <ConfirmSignUp msg={success} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col">
          <div className="col-4  br p-3" id="to-do-div">
            <LoginPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
