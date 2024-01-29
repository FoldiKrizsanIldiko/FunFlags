import React,{ useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

function Login(props) {
  const setUser = props.setUser;
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch(
      `https://zldnuw6vi1.execute-api.eu-west-2.amazonaws.com/user/${event.target[0].value}/${event.target[1].value}`
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

   function submitCaptcha() {
     let user_captcha = document.getElementById("user_captcha_input").value;

     if (validateCaptcha(user_captcha) === true) {
       alert("Captcha Matched");
       loadCaptchaEnginge(6);
       document.getElementById("user_captcha_input").value = "";
     } else {
       alert("Captcha Does Not Match");
       document.getElementById("user_captcha_input").value = "";
     }
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
        <div className="container">
          <div className="form-group">
            <div className="col mt-3">
              <LoadCanvasTemplate />
            </div>

            <div className="col mt-3">
              <div>
                <input
                  placeholder="Enter Captcha Value"
                  id="user_captcha_input"
                  name="user_captcha_input"
                  type="text"
                >
                </input>
              </div>
            </div>

            <div className="col mt-3">
              <div>
                <button class="btn btn-primary" onClick={() => submitCaptcha()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
