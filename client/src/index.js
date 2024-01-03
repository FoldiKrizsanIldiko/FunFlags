import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
//import './index.css';
import "./App.css";
//nem csak az App kell, hanem az összes pages

//import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import ChooseGame from './components/ChooseGame';
import QuizMode from './components/QuizMode';
import Game from './components/Game';
import LeaderBoard from './components/LeaderBoard';
import reportWebVitals from './reportWebVitals';

function App() {
const [data, setData] = useState([]);
const [screen, setScreen] = useState("welcome");

const [searchBy, setSearchBy] = useState("");
const [user, setUser] = useState();
const [sortedUsers, setSortedUsers] = useState([]);

useEffect(() => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      const nameAndFlag = data.map((cou) => {
        return {
          name: cou.name.common,
          flag: cou.flags.png,
          region: cou.region,
          capital: cou.capital,
        };
      });
      setData(nameAndFlag);
    })
    .catch((e) => console.log(e));
}, []);


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login setUser={setUser} setScreen={setScreen} />,
  },

  {
    path: "/register",
    element: <Register setUser={setUser} setScreen={setScreen} />,
  },

  {
    path: "/chooseGameMode",
    element: <ChooseGame setScreen={setScreen} />,
  },
  {
    path: "/quiz",
    element: (
      <QuizMode
        data={data}
        setScreen={setScreen}
        user={user}
        setSortedUsers={setSortedUsers}
      />
    ),
  },
  {
    path: "/game",
    element: (
      <div className="gameDiv">
        <Game
          data={data}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          setScreen={setScreen}
          user={user}
          setSortedUsers={setSortedUsers}
        />
      </div>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <div className="leaderboard">
        <h1>High scores </h1>
        <LeaderBoard sortedUsers={sortedUsers} setScreen={setScreen} />
      </div>
    ),
  },
]);
return (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
