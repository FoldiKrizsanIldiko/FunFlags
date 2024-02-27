import "../styles/Main.css";
import Login from "./Login";
import QuizMode from "./QuizMode";
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import Register from "./Register"
import { useLocation } from 'react-router-dom';

export const UserContext = createContext(null);
export const RestCountriesContext = createContext([]);

function Main() {
  const location = useLocation()
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const isRegisterRoute = location.pathname === '/register';
 
  return (
    <div>
      <RestCountriesContext.Provider value={{ data, setData }}>
        <UserContext.Provider value={{ user, setUser }}>
          <QuizMode />
          {!user ? (
            !isRegisterRoute ? <Login /> : <Register />
          ) : (
            <div className="game-area">
              <Sidebar />
              <Outlet />
            </div>
          )}
        </UserContext.Provider>
      </RestCountriesContext.Provider>
    </div>
  );
}

export default Main;
// function App() {
//   const [user, setUser] = useState(null);
//   const [showRegister, setShowRegister] = useState(false); // State variable to track if Register should be displayed

//   return (
//     <div>
//       <RestCountriesContext.Provider value={{ data, setData }}>
//         <UserContext.Provider value={{ user, setUser }}>
//           <QuizMode />
//           {!user && !showRegister ? ( // Display Login if user is not logged in and showRegister is false
//             <Login onRegisterClick={() => setShowRegister(true)} /> // Pass a callback to handle the register button click
//           ) : (
//             <div className="game-area">
//               <Sidebar />
//               <Outlet />
//             </div>
//           )}
//           {showRegister && <Register />} {/* Display Register component if showRegister is true */}
//         </UserContext.Provider>
//       </RestCountriesContext.Provider>
//     </div>
//   );
// }

// export default App;
// function Login({ onRegisterClick }) {
//   const handleRegisterClick = () => {
//     // Call the onRegisterClick callback passed from the parent component
//     if (typeof onRegisterClick === 'function') {
//       onRegisterClick();
//     }
//   };