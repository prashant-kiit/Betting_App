import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  console.log(user);

  return (
    <>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <div className="card">
          <p>Welcome {user.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="card">
          <p>Please Login</p>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      )}
    </>
  );
}

export default App;
