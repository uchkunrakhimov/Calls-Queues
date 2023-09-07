import React from "react";
import { container } from "../styles";
//import Header from "../components/Header";
//import Contents from "../components/Contents";
//import Test from "../components/Test";
import TestTable from "../components/TestTable";

const App = () => {
  return (
    <section style={container as React.CSSProperties}>
      {/* <Header />
      <Contents /> */}
      {/* <Test /> */}
      {<TestTable />}
    </section>
  );
};

export default App;
