import { useAuth0 } from "@auth0/auth0-react";
import Title from "./Title.jsx";
import Interface from "./Interface.jsx";

function Dashboard() {
  const { user, logout } = useAuth0();

  return (
    <>
      <div>
        <Title pageName={"Dashboard"} />
      </div>
      <div>
        <p>Welcome {user.name}.</p>
        <Interface />
        <button
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Dashboard;
