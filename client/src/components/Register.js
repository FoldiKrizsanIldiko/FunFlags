import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"
function Register(props) {
  const setUser = props.setUser;
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const entries = [...formData.entries()];

    const newUser = entries.reduce((acc, entry) => {
      const [key, value] = entry;
      acc[key] = value;
      return acc;
    }, {});

    newUser.password === newUser.password2
      ? fetch(
          " https://g1npuzfff6.execute-api.eu-west-2.amazonaws.com/default/flags-post",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        )
          .then((res) => res.json())
          .then((data) =>
            typeof data === "string"
              ? toast("Username already exists!", { theme: "dark" })
              : (setUser(data), navigate("/chooseGameMode"))
          )
      : toast("The passwords do not match!", { theme: "dark" });
  }

  return (
    <div className="bg">
    <form onSubmit={(event) => handleSubmit(event)}>
      <h3>Register now</h3>

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Email or Phone" id="username" required={true} />

      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" required={true} />

      <label htmlFor="password">Password Again</label>
      <input type="password" placeholder="Password" id="password" required={true} />

      <button>Register</button>
      
    </form>

  </div>
  );
}
export default Register;
