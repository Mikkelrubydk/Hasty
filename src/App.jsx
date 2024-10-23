import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import SolveTask from "./pages/SolveTask";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NavBar from "./components/NavBar";
import "./App.css";
import "../firebase-config";

export default function App() {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [activeClass, setActiveClass] = useState(
    parseInt(localStorage.getItem("activeClass"), 10) || 0
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
      } else {
        setIsAuth(false);
        localStorage.removeItem("isAuth");
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("activeClass", activeClass);
  }, [activeClass]);

  // Definering af private og offentlige routes
  const privateRoutes = (
    <>
      <NavBar activeClass={activeClass} setActiveClass={setActiveClass} />
      <Routes>
        <Route
          path="/"
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
          path="/profile"
          element={<ProfilePage setActiveClass={setActiveClass} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  const publicRoutes = (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );

  // Rendering af routes baseret på om de er logget ind
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}
