import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

function Interface() {
  const { getAccessTokenSilently, user } = useAuth0();

  const placeOrderCall = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "poiuytrewq",
        scope: "read:all write:all",
      },
    });

    // console.log(token);

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

  const addMoneyCall = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: "poiuytrewq",
        scope: "read:all write:all",
      },
    });

    // console.log(token);

    await axios.put(
      "http://localhost:8081/addMoney",
      {
        email: user.sub,
        wallet: 100,
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

  const addMoney = useMutation({
    mutationFn: async () => {
      await addMoneyCall();
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
      <button
        onClick={() => {
          addMoney.mutate();
        }}
      >
        Add Money
      </button>
    </>
  );
}

export default Interface;
