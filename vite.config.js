import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/Hasty/", // Sæt base til /Hasty/ i produktion
  };

  if (command === "serve") {
    config.base = "/"; // Brug root for udvikling
  }

  return config;
});
