import React from "react";
import practice from "../../src/practice.png";
import quizMode from "../../src/quiz.png";
import { useNavigate } from "react-router-dom";

function ChooseGame(props) {
  const navigate = useNavigate();
  const setUser = props.setUser;
  function logOut() {
    setUser();
    navigate("/");
  }
  return (
    <div className="App">
      <div className="chooseGame">
        <h1 className="gameMode">Choose your Game Mode</h1>
        <div className="chooseGameMode">
          <div>
            <img
              className="gameMode1"
              src={quizMode}
              onClick={() => {
                navigate("/quiz");
              }}
            />
            <p className="gmlabel">Quiz Mode with possible answers</p>
          </div>
          <div>
            <img
              className="gameMode2"
              src={practice}
              onClick={() => {
                navigate("/game");
              }}
            />
            <p className="gmlabel">Practice Mode with list</p>
          </div>
          <button className="finishButton" onClick={logOut} style={{height:"80px", width:"130px"}}>
            Log out<span></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseGame;
