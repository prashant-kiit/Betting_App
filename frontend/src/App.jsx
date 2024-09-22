// import { useAuth0 } from "@auth0/auth0-react";
// import Dashboard from "./Dashboard";
// import Home from "./Home";

import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "./Redux/matchSlice.js";

function App() {
  // const { isAuthenticated } = useAuth0();

  // return <>{isAuthenticated ? <Dashboard /> : <Home />}</>;

  const matches = useSelector((state) => state.matches);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        {matches.map((match) => (
          <p key={match.id}>{match}</p>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(addMatch("Match 1"));
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default App;
