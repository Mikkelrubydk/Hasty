export default function StepTwo({ taskData, handleInputChange }) {
  return (
    <section className="step2section">
      <h1 className="step1h1">Angiv din opgavetitel</h1>
      <h3>Indtast en titel for opgaven</h3>
      <div className="beskriv-boks">
        <textarea
          className="tekst"
          name="title"
          placeholder="fx. Skift kæde på cykel med udvendige gear"
          value={taskData.title || ""} // Sæt værdien til den gemte titel fra taskData
          onChange={handleInputChange} // Opdater titlen ved ændringer
        ></textarea>
      </div>
    </section>
  );
}
