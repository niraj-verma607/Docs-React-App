import React from "react";
import Background from "./components/Background";
import Foreground from "./components/Foreground";

const App = () => {
  return (
    <div className=" relativew-full h-screen bg-zinc-800">
      <Background />
      <Foreground />
    </div>
  );
};

export default App;
