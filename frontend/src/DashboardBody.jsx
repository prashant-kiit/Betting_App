import { useState } from "react";

function DashboardBody() {
  console.log("Counter Running");

  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}
export default DashboardBody;
