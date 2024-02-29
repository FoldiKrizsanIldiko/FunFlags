import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./Main";
import "../styles/Leaderboard.css"
function LeaderBoard() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [quizScore, setQuizScore] = useState(0);
  const [sortedUsers, setSortedUsers] = useState([]);

  function logOut() {
    setUser();
    navigate("/");
  }
  useEffect(() => {
    const fetchData = async () => {
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
        // navigate("/leaderboard");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

console.log(sortedUsers);
  return (

    <div className="bg-container">
      <div className="score-title">
        <h2>High Scores</h2>
      </div>
      <table className="score-table">
          <thead>
            <tr className="table-head">
              <td className="nameCellHead">Name</td>
              <td className="scoreCellHead">Score</td>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u) => (
              <tr className="scoreEntry" key={u.name}>
                <td className="nameCell">{u.name}</td>
                <td className="scoreCell">{u.points}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
            <div>
              <button className="new-game-btn" onClick={()=>navigate("/quiz")}>Back to the game</button>
              <button className="logout-btn" onClick={()=>logOut()}>Log Out</button>
            </div>
    </div>
  );
}

export default LeaderBoard;
