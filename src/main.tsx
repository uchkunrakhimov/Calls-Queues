import ReactDOM from "react-dom/client";
import { App } from "./pages/";
import "./styles/style.css";
import "antd/dist/reset.css";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);