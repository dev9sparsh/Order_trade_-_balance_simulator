import { useContext } from "react";
import "./App.css";
import NavBar from "./component/navbar/NavBar";
import Dashboard from "./pages/Dashboard";
import { Box } from "@mui/material";
import { Context } from "./context/context";

function App() {
  const { darkMode } = useContext(Context);

  return (
    <Box sx={{ background: darkMode ? "#000" : "#fff" }}>
        <NavBar />
        <Dashboard />
    </Box>
  );
}

export default App;
