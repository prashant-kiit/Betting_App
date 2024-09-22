import { useAuth0 } from "@auth0/auth0-react";
import Title from "./Title";

function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div>
        <Title pageName={"Home"} />
      </div>
      <div>
        <p>The Best Place to Bet.</p>
        <button
          onClick={async () => {
            await loginWithRedirect();
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Home;
