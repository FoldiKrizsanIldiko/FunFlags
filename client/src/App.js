import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleOpen = () => {
    setIsDrawerOpen(!isDrawerOpen)
  };

  return (
    <div className={isDrawerOpen === true ? "sidebar-main" : "sidebar-main-closed"}>
      <div>
        <div className={isDrawerOpen === true ? "open" : "closed"} onClick={handleOpen}>{isDrawerOpen==true?<i class="fa-classic fa-solid fa-chevron-left"></i>:<i class="fa-classic fa-solid fa-chevron-right"></i>}</div>
      </div>
      <div  className={isDrawerOpen === true ? "" : "sidebar-hidden"}>
        <i className="fa-solid fa-user" ></i>
      </div>
      <div className={isDrawerOpen === true ? "btn" : "sidebar-hidden"}>
        <button>Game Modes</button>
        <button>Settings</button>
        <button>High Scores</button>
        <button className='logout'>Logout</button>
      </div>
      </div>
  );
}

export default App;
