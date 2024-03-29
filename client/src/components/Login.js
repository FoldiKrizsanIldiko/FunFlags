import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const setUser = props.setUser;
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    fetch(
      `https://4rjjlsl47e.execute-api.eu-west-2.amazonaws.com/flags-get1/user/${event.target[0].value}/${event.target[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.name
          ? (setUser(data), navigate("/chooseGameMode"))
          : toast.error("Incorrect name and/or password!", {
              theme: "colored",
              position: "top-right",
            });
      });
  }

  return (
    <div className="App">
      <div className="login">
        <h1> Welcome</h1>
        <h2>
          This is an educational game. <br />
          You have to guess which country's flag is displayed.
          <br />
          Before you start, please log in:
        </h2>
        <br></br>
        <form className="userForm" onSubmit={(event) => handleSubmit(event)}>
          <div className="user-box">
            <input type="text" required={true}></input>
            <label>Name: </label>
          </div>
          <div className="user-box">
            <input type="password" required={true}></input>
            <label>Password: </label>
          </div>
          <button type="submit" className="userFormButton">
            Start game<span></span>
          </button>
        </form>
        <button
          style={{ fontSize: "small" }}
          onClick={() => navigate("/register")}
          className="userFormButton"
        >
          Register<span></span>
        </button>
        <ToastContainer theme="dark" position="top-right" />
      </div>
    </div>
  );
}
export default Login;
