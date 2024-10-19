import { useState } from "react";

export default function StepTwo() {
  const [taskDescription, setTaskDescription] = useState("");

  const handleChange = (event) => {
    setTaskDescription(event.target.value); // Opdater tilstanden når teksten ændres
    console.log(event);
  };

  return (
    <section className="step2section">
      <h1 className="step1h1">Beskriv din opgave</h1>
      <h3>Kort beskrivelse af opgaven</h3>
      <div className="beskriv-boks">
        <textarea
          className="tekst"
          placeholder="fx. Skift kæde på cykel med udvendige gear"
          value={taskDescription} // Sæt værdien af textarea til den gemte beskrivelse
          onChange={handleChange} // Opdater beskrivelsen ved ændringer
        ></textarea>
      </div>
    </section>
  );
}
