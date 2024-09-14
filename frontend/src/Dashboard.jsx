import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Title from "./Title.jsx";
import Interface from "./Interface.jsx";
import { useEffect } from "react";

function Dashboard() {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const registerUser = useMutation({
    mutationFn: async () => {
      await registerUserCall();
    },
  });

  const registerUserCall = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "poiuytrewq",
        scope: "read:all write:all",
      },
    });

    // console.log(token);

    await axios.post(
      "http://localhost:8081/register",
      {
        email: user.sub,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    registerUser.mutate();
  }, []);

  return (
    <>
      <div>
        <Title pageName={"Dashboard"} />
      </div>
      <div>
        <p>Welcome {user.sub}.</p>
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
