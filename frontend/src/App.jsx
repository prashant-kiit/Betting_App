import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { postMatch } from "./Redux/matchSlice.js";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>{isLoading ? <Loader/> : isAuthenticated ? <Dashboard /> : <Home />}</>
  );

  // const matches = useSelector((state) => state.matches);
  // const dispatch = useDispatch();

  // return (
  //   <>
  //     <div>
  //       {matches.map((match) => (
  //         <p key={match.id}>{match}</p>
  //       ))}
  //     </div>
  //     <div>
  //       <button
  //         onClick={() => {
  //           dispatch(postMatch("Match 1"));
  //         }}
  //       >
  //         Add
  //       </button>
  //     </div>
  //   </>
  // );
}

export default App;
