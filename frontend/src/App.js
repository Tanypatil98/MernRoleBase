import { useRoutes } from "react-router-dom";
import getRoutes from "./routes";
import "./App.css";
import "./css/style.css";

function App() {
    const user = 
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"));
  const routing = useRoutes(getRoutes(user));
  return <> {routing}</>;
}

export default App;
