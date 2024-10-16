import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import SolveTask from "./pages/SolveTask";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import "./App.css";
import { useState } from "react";

export default function App() {
  const location = useLocation();
  const [activeClass, setActiveClass] = useState(0);

  return (
    <>
      {/* NavBar skal være synlig på de Routes som IKKE er "/" */}
      {location.pathname !== "/" && (
        <NavBar activeClass={activeClass} setActiveClass={setActiveClass} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/hjem"
          element={<HomePage setActiveClass={setActiveClass} />}
        />
        <Route
          path="/opretopgave"
          element={<CreateTask setActiveClass={setActiveClass} />}
        />
        <Route
          path="/klaropgave"
          element={<SolveTask setActiveClass={setActiveClass} />}
        />
        <Route
          path="/profil"
          element={<Profile setActiveClass={setActiveClass} />}
        />
      </Routes>
    </>
  );
}
