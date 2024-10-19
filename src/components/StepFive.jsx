import { useState } from "react";

export default function StepFive({
  taskData,
  handleInputChange,
  handleImageChange,
}) {
  return (
    <section className="step5section">
      <h1 className="step1h1">Færdigørelse</h1>

      <div className="beskriv-boks">
        <input
          type="file"
          accept="image/*" // Begræns til billedfiler
          onChange={handleImageChange} // Håndter billede-upload
        />
      </div>

      <h2 className="prish2">Startpris</h2>
      <div className="pris-boks">
        <input
          type="text"
          name="price" // Tilknyt navn til input
          value={taskData.price} // Bind til taskData
          onChange={handleInputChange} // Håndter ændringer
          placeholder="Angiv pris"
          className="pris-tekst"
        />
      </div>
    </section>
  );
}
