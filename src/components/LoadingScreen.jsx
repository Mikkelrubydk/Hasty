import React, { useEffect, useState } from "react";
import "../App.css";

export default function LoadingScreen() {
  return (
    <section className="loader">
      <figure>
        <img src="./loader.gif" alt="loader" />
      </figure>
    </section>
  );
}
