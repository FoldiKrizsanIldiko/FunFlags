import "../styles/Main.css";
import Login from "./Login";
import QuizMode from "./QuizMode";
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import Register from "./Register"
import { useLocation } from 'react-router-dom';
import LeaderBoard from "./LeaderBoard";


export const UserContext = createContext(null);
export const RestCountriesContext = createContext([]);

function Main() {
  const location = useLocation()
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const isRegisterRoute = location.pathname === '/register';
  const isLeaderBoardRoute=location.pathname==="/leaderboard";

  return (
    <div>
      <RestCountriesContext.Provider value={{ data, setData }}>
        <UserContext.Provider value={{ user, setUser }}>
           <QuizMode />
          {!user ? (
            !isRegisterRoute ? <Login /> : <Register />
          ) : (
              !isLeaderBoardRoute?
            <div className="game-area">
              <Sidebar />
              <Outlet />
            </div>
            :
            <LeaderBoard/>
          )}
        </UserContext.Provider>
      </RestCountriesContext.Provider>
    </div>
  );
}

export default Main;
