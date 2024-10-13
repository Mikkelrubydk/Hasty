import React, { useEffect, useState } from "react";
import "../App.css";

export default function LoadingScreen() {
  // State til at styre, om loading screenet skal vises eller ej
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Sætter en timer til at ændre loading til false efter 4 sekunder
    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start fade-out animation

      const hideTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // 0.5 sekunder

      return () => clearTimeout(hideTimer);
    }, 1000); // 1 sekunder

    // Rydder timeren
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`loader ${isFadingOut ? "fade-out" : ""}`}
      style={{ display: isLoading ? "flex" : "none" }}
    >
      <figure>
        <img src="/loader.gif" alt="loader" />
      </figure>
    </section>
  );
}
