import "../styles/Main.css";
import Login from "./Login";
import QuizMode from "./QuizMode";
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";

export const UserContext = createContext(null);
export const RestCountriesContext = createContext([]);

function Main() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <div>
      <RestCountriesContext.Provider value={{ data, setData }}>
        <UserContext.Provider value={{ user, setUser }}>
          <QuizMode />
          {!user ? (
            <Login />
          ) : (
            <div className="game-area">
              <Sidebar />
              <Outlet />
            </div>
          )}
        </UserContext.Provider>
      </RestCountriesContext.Provider>
    </div>
  );
}

export default Main;
