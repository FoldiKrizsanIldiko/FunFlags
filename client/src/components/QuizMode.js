import "../styles/QuizMode.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RestCountriesContext, UserContext } from "./Main";

function QuizMode() {
  const [sortedUsers, setSortedUsers] = useState([]);
  const [randomCountry, setRandomCountry] = useState();
  const [fourCountryName, setFourCountryName] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [answerNumber] = useState(4);
  const { user } = useContext(UserContext);
  const { data, setData } = useContext(RestCountriesContext);

  function randomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function randomFlagAndName() {
    setRandomCountry(data[randomNumber(data.length)]);
  }

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
    randomFlagAndName();
  }, []);

  async function updateUserScore() {
    try {
      const res = await fetch(
        "https://jsi3s3s492.execute-api.eu-west-2.amazonaws.com/default/flags-patch",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.name, score: quizScore }),
        }
      );
      const data = await res.json();
      setSortedUsers(data);
      console.log(sortedUsers);
      // navigate("/leaderboard");
    } catch (error) {
      console.error("Something went wrong!");
    }
  }

  function selectCountry(answer) {
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
      const temp = data[randomNumber(data.length)].name;
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
    randomCountry && generateCountryOptions();
  }, [randomCountry]);

  return (
    randomCountry &&
    fourCountryName && (
      <div className="quiz-container">
        <div className="title-container">
          <div className="game-title">
            <h2>This flag belongs to...</h2>
          </div>
        </div>
        <div className="quiz-main-container">
          <div className="qmc-left">
            <div className="flag-container">
              <img
                alt="flag"
                className="actual-flag"
                src={randomCountry.flag}
              />
            </div>
            <div className="qmc-options">
              <button
                className="qmc-button"
                key={1}
                value={fourCountryName[0]}
                onClick={(e) => selectCountry(e.target.value)}
              >
                {fourCountryName[0]}
              </button>
              <button
                className="qmc-button"
                key={2}
                value={fourCountryName[1]}
                onClick={(e) => selectCountry(e.target.value)}
              >
                {fourCountryName[1]}
              </button>
              <button
                className="qmc-button"
                key={3}
                value={fourCountryName[2]}
                onClick={(e) => selectCountry(e.target.value)}
              >
                {fourCountryName[2]}
              </button>
              <button
                className="qmc-button"
                key={4}
                value={fourCountryName[3]}
                onClick={(e) => selectCountry(e.target.value)}
              >
                {fourCountryName[3]}
              </button>
            </div>
          </div>
          <div className="qmc-right">
            <div className="hint-and-helps">hints and helps...</div>
            <div className="score">
              <div className="quizScore">
                <p>Your score:</p>
                <p>{quizScore}</p>
              </div>
            </div>
            <div className="finish-game">
              <button
                className="finishButton"
                onClick={() => {
                  updateUserScore();
                  setQuizScore(0);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    )
  );
}

export default QuizMode;
