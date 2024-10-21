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
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage
  const location = useLocation();
  const [activeClass, setActiveClass] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is authenticated / signed in
        setIsAuth(true); // set isAuth to true
        localStorage.setItem("isAuth", true); // also, save isAuth in localStorage
      } else {
        // user is not authenticated / not signed in
        setIsAuth(false); // set isAuth to false
        localStorage.removeItem("isAuth"); // remove isAuth from localStorage
      }
    });
  }, []);

  // variable holding all private routes including the nav bar
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

  // variable holding all public routes without nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );

  // if user is authenticated, show privateRoutes, else show publicRoutes
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}
