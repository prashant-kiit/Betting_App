import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Title from "./Title.jsx";

function Home() {
  const login = useMutation({
    mutationFn: async () => {
      await callLogin();
    },
  });

  const callLogin = async () => {
    console.log("Call Login");

    const response = await axios.get(
      "http://localhost:8081/login"
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
        <Title pageName={"Home"} />
      </div>
      <div>
        <p>This is Home Page. Also Landing Page.</p>
        <button
          onClick={() => {
            login.mutate();
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Home;
