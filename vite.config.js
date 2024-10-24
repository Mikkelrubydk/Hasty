import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/Hasty/", // Angiv din GitHub repository navn som base path
  };

  // Hvis du kører i development mode, så vil base være /
  if (command === "serve") {
    config.base = "/";
  }

  return config;
});
