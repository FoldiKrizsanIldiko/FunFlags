import "../styles/Sidebar.css";
import React, { useState, useContext } from "react";
import { UserContext } from "./Main";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div
      className={isDrawerOpen === true ? "sidebar-main" : "sidebar-main-closed"}
    >
      <div>
        <div
          className={isDrawerOpen === true ? "open" : "closed"}
          onClick={handleOpen}
        >
          {isDrawerOpen === true ? (
            <i className="fa-classic fa-solid fa-chevron-left"></i>
          ) : (
            <i className="fa-classic fa-solid fa-chevron-right"></i>
          )}
        </div>
      </div>
      <div
        className={isDrawerOpen === true ? "open-user-icon" : "sidebar-hidden"}
      >
        <i className="fa-solid fa-user"></i>
        <span>{user.name}</span>
        <span>Score: {user.points}</span>
      </div>
      <div className={isDrawerOpen === true ? "btn" : "sidebar-hidden"}>
        <button
          title="This function is not implemented yet!"
          className="inactive"
        >
          Game Modes
        </button>
        <button
          title="This function is not implemented yet!"
          className="inactive"
        >
          Settings
        </button>
        <button onClick={() => navigate("/leaderboard")}>High Scores</button>
        <button className="logout" onClick={() => setUser(null)}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
