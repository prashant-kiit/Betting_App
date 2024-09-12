import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Title from "./Title.jsx";

function Dashboard() {
  const logout = useMutation({
    mutationFn: async () => {
      await callLogout();
    },
  });

  const callLogout = async () => {
    const response = await axios.get(
      "http://localhost:8081/logout"
      //   , {
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "application/json; charset=UTF-8",
      //   },
      // }
    );
    console.log(response);
  };

  return (
    <>
      <div>
        <Title pageName={"Dashboard"} />
      </div>
      <div>
        <p>
          This is the Dashboard Page of Betting App. Welocme to Betting App.
        </p>
        <button
          onClick={() => {
            logout.mutate();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Dashboard;
