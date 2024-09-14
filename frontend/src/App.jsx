import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated ? <Dashboard /> : <Home />}</>;
}

export default App;
