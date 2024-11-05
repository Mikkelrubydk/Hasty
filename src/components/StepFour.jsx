// Dette komponent er programmeret af Anders og Mikkel

export default function StepFour({ taskData, handleInputChange }) {
  return (
    <section className="step4section">
      <h1 className="step1h1">Uddyb beskrivelse</h1>
      <h3 className="tekst-step4">
        Uddybende beskrivelse af opgaven, så opgaven kan blive løst lige som du
        ønsker det
      </h3>
      <div className="beskriv-boks">
        <textarea
          className="tekst"
          placeholder="Beskriv her..."
          name="description" // Tilknyt navn til input
          value={taskData.description} // Bind til taskData
          onChange={handleInputChange} // Håndter ændringer
        ></textarea>
      </div>
    </section>
  );
}
