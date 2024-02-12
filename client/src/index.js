import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizMode from "./components/QuizMode";
import LeaderBoard from "./components/LeaderBoard";
import Register from "./components/Register";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
            path:"/quiz",
            element:<QuizMode/>
        },
        {
            path:"/leaderboard",
            element:<LeaderBoard/>
        },
        // {
        //   path:"/register",
        //   element:<Register/>
        // }
      ],
    },
  ]);
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
reportWebVitals();