import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"
function Login(props) {
  const setUser = props.setUser;
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event)
    fetch(
      `https://4rjjlsl47e.execute-api.eu-west-2.amazonaws.com/flags-get1/user/${event.target[0].value}/${event.target[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      <form onSubmit={(event) => handleSubmit(event)}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" required={true} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" required={true} />

        <button >Log In</button>
        <div className="social">
          <div className="go" onClick={()=>navigate("/register")}>Register now </div>
        </div>
      </form>

    </div>

  );
}
export default Login;
