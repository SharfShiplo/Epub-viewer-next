import React from "react";

function Wrapper({screenMood, children }) {
  return (
    <div
      className={`bg-white absolute h-[80vh] ${
        screenMood ? "top-0 w-full " : "top-20 shadow-lg max-w-7xl mx-auto"} inset-x-0`}
    >
      {children}

    </div>
  );
}

export default Wrapper;
