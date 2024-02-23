import "../styles/Sidebar.css";
import React, { useState, useContext } from "react";
import { UserContext } from "./Main";

function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

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
      </div>
      <div className={isDrawerOpen === true ? "btn" : "sidebar-hidden"}>
        <button>Game Modes</button>
        <button>Settings</button>
        <button>High Scores</button>
        <button className="logout" onClick={() => setUser(null)}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
