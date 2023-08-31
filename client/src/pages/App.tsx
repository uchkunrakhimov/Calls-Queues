import React from "react";
import { container } from "../styles";
import Header from "../components/Header";
import Contents from "../components/Contents";
import Test from "../components/Test";

const App = () => {
  return (
    <section style={container as React.CSSProperties}>
      {/* <Header />
      <Contents /> */}
      <Test />
    </section>
  );
};

export default App;
