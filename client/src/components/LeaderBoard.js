import { useNavigate } from "react-router-dom";

function LeaderBoard(props) {
  const sortedUsers = props.sortedUsers;
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <td className="nameCellHead">Name</td>
              <td className="scoreCellHead">Score</td>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr className="scoreEntry" key={user.name}>
                <td className="nameCell">{user.name}</td>
                <td className="scoreCell">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => navigate("/chooseGameMode")}
          className="submitButton"
        >
          New Game <span></span>
        </button>
      </div>
    </div>
  );
}

export default LeaderBoard;
