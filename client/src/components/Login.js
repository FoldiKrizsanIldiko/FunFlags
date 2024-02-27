import "../styles/Login.css";
import { React, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Main";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `https://4rjjlsl47e.execute-api.eu-west-2.amazonaws.com/flags-get1/user/${event.target[0].value}/${event.target[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data.name
          ? (setUser(data), navigate("/quiz")) 
          : toast.error("Incorrect name and/or password!", {
              theme: "colored",
              position: "top-right",
            });
      });
  }

  return (
    <div className="bg">
      <div className="form">
        <form onSubmit={(event) => handleSubmit(event)}>
          <img alt="globe" src="../globe.png" className="globe" />
          <h3 className="welcome">WELCOME</h3>
          <p className="paragraph-1">
            This is an educational game. <br />
            You have to guess which country’s
            <br /> flag is displayed.
            <br />
            Before you start, please log in:
          </p>

          <div className="bg-input">
            <input type="text" placeholder="Username" required={true} />
            <input
              type="password"
              placeholder="Password"
              required={true}
              className="password"
            />
          </div>

          <div className="login-div">
            <button className="login">Log In</button>
          </div>

          <div className="social">
            <div className="go" onClick={() => navigate("/register")}>
              Register
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;

