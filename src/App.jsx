import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import SolveTask from "./pages/SolveTask";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hjem" element={<HomePage />} />
        <Route path="/klaropgave" element={<CreateTask />} />
        <Route Path="/opretopgave" element={<SolveTask />} />
        <Route Path="/profil" element={<Profile />} />
      </Routes>
    </>
  );
}
