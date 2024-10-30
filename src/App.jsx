import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import SolveTask from "./pages/SolveTask";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NavBar from "./components/NavBar";
import "./App.css";
import "../firebase-config"; // Sørg for, at denne fil er korrekt og importeres
import TaskDescription from "./pages/TaskDescription";
import Chat from "./pages/Chat";

export default function App() {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem("isAuth") === "true"
  );
  const [userId, setUserId] = useState(null); // Opretter state til bruger-ID
  const [activeClass, setActiveClass] = useState(
    parseInt(localStorage.getItem("activeClass"), 10) || 0
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setUserId(user.uid); // Gemmer brugerens ID, når de er logget ind
        localStorage.setItem("isAuth", "true");
      } else {
        setIsAuth(false);
        setUserId(null);
        localStorage.removeItem("isAuth");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("activeClass", activeClass);
  }, [activeClass]);

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
        <Route path="/tasks/:taskId" element={<TaskDescription />} />
        <Route path="/tasks/:taskId/chat" element={<Chat userId={userId} />} />
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

  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}
