import React from "react";
import { container } from "../styles";
import { Header, Contents } from "../components/";

const App = () => {
  return (
    <section style={container as React.CSSProperties}>
      <Header />
      <Contents />
    </section>
  );
};

export { App };
