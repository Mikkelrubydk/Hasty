import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Ensure App.jsx is also in the src folder
import "./index.css";

const basename = import.meta.env.MODE === "development" ? "/" : "/Hasty/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
