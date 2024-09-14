import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

function Interface() {
  const { getAccessTokenSilently } = useAuth0();

  const placeOrderCall = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "poiuytrewq",
        scope: "read:all write:all",
      },
    });

    await axios.post(
      "http://localhost:8081/placeBet",
      {
        matchId: "66e02920d67b5a5bd4a2129f",
        betOn: "Russia",
        amount: 100008,
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

  const placeOrder = useMutation({
    mutationFn: async () => {
      await placeOrderCall();
    },
  });

  return (
    <>
      <button
        onClick={() => {
          placeOrder.mutate();
        }}
      >
        Place Order
      </button>
    </>
  );
}

export default Interface;
