import React from "react";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ChooseGame from "./components/ChooseGame";
import QuizMode from "./components/QuizMode";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";

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
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

export default App;
