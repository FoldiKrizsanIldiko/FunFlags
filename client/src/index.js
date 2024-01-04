import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./index.css";
//import "./App.css";
//nem csak az App kell, hanem az összes pages

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import ChooseGame from "./components/ChooseGame";
import QuizMode from "./components/QuizMode";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
