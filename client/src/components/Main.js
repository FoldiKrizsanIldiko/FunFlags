import React from "react";
import { useState, useEffect,createContext } from "react";
import Login from "./Login";
import QuizMode from "./QuizMode";
import { Outlet } from "react-router-dom";
import App from "../App";
export const UserContext=createContext(null);
export const RestCountriesContext=createContext([]);
function Main() {
  const [data, setData] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [user, setUser] = useState(null);
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

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login setUser={setUser} />,
  //   },

  //   {
  //     path: "/register",
  //     element: <Register setUser={setUser} />,
  //   },
  //   {
  //     path: "/quiz",
  //     element: (
  //       <QuizMode data={data} user={user} setSortedUsers={setSortedUsers} />
  //     ),
  //   },
  //   {
  //     path: "/game",
  //     element: (
  //       <div className="gameDiv">
  //         <Game
  //           data={data}
  //           searchBy={searchBy}
  //           setSearchBy={setSearchBy}
  //           user={user}
  //           setSortedUsers={setSortedUsers}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/leaderboard",
  //     element: (
  //       <div className="leaderboard">
  //         <h1>High scores </h1>
  //         <LeaderBoard sortedUsers={sortedUsers} setUser={setUser} />
  //       </div>
  //     ),
  //   },
  // ]);
  return (
    <div>
      <RestCountriesContext.Provider value={{data,setData}}>
      <UserContext.Provider value={{user,setUser}}>
      <QuizMode setSortedUsers={setSortedUsers} />
      {!user? <Login/>:
      <>
      <App/>
      <Outlet/>
      </>
      }
    </UserContext.Provider>
    </RestCountriesContext.Provider>
    </div>
  );
}

export default Main;
