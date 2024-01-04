import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function QuizMode(props) {
  const activeUser = props.user;
  const restCountriesAll = props.data;
  const setSortedUsers = props.setSortedUsers;
  const [randomCountry, setRandomCountry] = useState();
  const [fourCountryName, setFourCountryName] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [answerNumber, setAnswerNumber] = useState(); //this should be asked if U want adjustable nuber of answers
  const navigate = useNavigate();

  function randomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function randomFlagAndName() {
    setRandomCountry(restCountriesAll[randomNumber(restCountriesAll.length)]);
  }

  async function updateUserScore() {
    try {
      const res = await fetch("http://localhost:3001/api/score", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: activeUser.name, score: quizScore }),
      });
      const data = await res.json();
      setSortedUsers(data);
      navigate("/leaderboard");
    } catch (error) {
      console.error("Something went wrong!");
    }
  }

  function selectCountry(answer) {
    console.log(answer);
    if (answer === randomCountry.name) {
      setQuizScore(quizScore + 5);
      toast.success("You're right! Next round!", {
        theme: "colored",
        autoClose: 2000,
      });
      randomFlagAndName();
    } else {
      toast.error(`The solution was ${randomCountry.name}`, {
        theme: "colored",
        autoClose: 2000,
      });
      randomFlagAndName();
    }
  }

  function generateCountryOptions() {
    const countryOptions = [];
    while (countryOptions.length < answerNumber) {
      const temp = restCountriesAll[randomNumber(restCountriesAll.length)].name;
      if (!countryOptions.includes(temp)) {
        countryOptions.push(temp);
      }
    }
    if (!countryOptions.includes(randomCountry.name)) {
      countryOptions[randomNumber(answerNumber)] = randomCountry.name;
    }
    setFourCountryName(countryOptions);
  }

  useEffect(() => {
    randomFlagAndName();
    activeUser &&
      toast.info(`Logged in as ${activeUser.name}`, {
        theme: "colored",
        autoClose: 3000,
      });
  }, [answerNumber]);

  useEffect(() => {
    randomCountry && generateCountryOptions();
  }, [randomCountry]);

  return (
    <div className="App">
      {answerNumber ? (
        randomCountry &&
        fourCountryName && (
          <div className="quizMain">
            <div className="flagContainer">
              <img className="quizFlag" src={randomCountry.flag} />
            </div>
            <h1 className="title">Flag of ...</h1>
            <div className="firstRow">
              <div className="answer">
                <button
                  className="finishButton"
                  key={1}
                  value={fourCountryName[0]}
                  onClick={(e) => selectCountry(e.target.value)}
                >
                  {fourCountryName[0]}
                  <span></span>
                </button>
              </div>
              <div className="answer">
                <button
                  className="finishButton"
                  key={2}
                  value={fourCountryName[1]}
                  onClick={(e) => selectCountry(e.target.value)}
                >
                  {fourCountryName[1]}
                  <span></span>
                </button>
              </div>
            </div>
            <div className="secondRow">
              <div className="answer">
                <button
                  className="finishButton"
                  key={3}
                  value={fourCountryName[2]}
                  onClick={(e) => selectCountry(e.target.value)}
                >
                  {fourCountryName[2]}
                  <span></span>
                </button>
              </div>
              <div className="answer">
                <button
                  className="finishButton"
                  key={4}
                  value={fourCountryName[3]}
                  onClick={(e) => selectCountry(e.target.value)}
                >
                  {fourCountryName[3]}
                  <span></span>
                </button>
              </div>
            </div>
            <div className="quizScore">Your score: {quizScore}</div>
            <button
              className="finishButton"
              onClick={() => {
                updateUserScore();
                navigate("/chooseGameMode");
              }}
            >
              Back to game modes<span></span>
            </button>
            <button className="finishButton" onClick={updateUserScore}>
              Finish Game<span></span>
            </button>
            <ToastContainer theme="dark" />
          </div>
        )
      ) : (
        <div>
          <h1 className="title">From how many possible answers do you want to choose</h1>
          <button onClick={() => setAnswerNumber(2)}>
            2 <span></span>
          </button>
          <button onClick={() => setAnswerNumber(3)}>
            3 <span></span>
          </button>
          <button onClick={() => setAnswerNumber(4)}>
            4 <span></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizMode;
