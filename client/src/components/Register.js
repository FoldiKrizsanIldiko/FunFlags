import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
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
      <form className="register">
        <h3 className="register-h3">Registration</h3>
        <div className="input-div">
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            required={true}
            className="input-register"
          />
          <input
            type="email"
            placeholder="Email"
            id="username"
            required={true}
            className="input-register"
          />
          <input
            type="password"
            placeholder="Password"
            id="password-register"
            required={true}
            className="input-register"
          />
          <input
            type="password"
            placeholder="Password again"
            id="password-register"
            required={true}
            className="input-register"
          />
        </div>
        <div className="button-div">
          <button className="register-btn" title="Registration disabled">
            Register
          </button>
          <button className="cancel-btn" onClick={() => navigate("/login")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
