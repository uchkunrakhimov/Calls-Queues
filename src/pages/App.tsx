import { FC, useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Home } from ".";
import Cookies from "js-cookie";

const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const isAuthenticated = useMemo(() => {
    const loggedCookie = Cookies.get("logged_in");
    return loggedCookie === "yes";
  }, [authenticated]);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/queues" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
};

export { App };