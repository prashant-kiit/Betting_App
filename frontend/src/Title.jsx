import { memo } from "react";

// eslint-disable-next-line react/prop-types
const Title = memo(({ pageName }) => {
  console.log("Title Running");

  return (
    <>
      <h1>Betting App</h1>
      <p>{pageName} Page</p>
    </>
  );
});

// Assign display name
Title.displayName = "Title";

export default Title;
