import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
    <section className="step2section">
      <h1 className="step1h1">Beskriv din opgave</h1>
      <h3>Kort beskrivelse af opgaven</h3>
      <div className="beskriv-boks">
        <textarea
          className="tekst"
          placeholder="fx. Skift kæde på cykel med udvendige gear"
        ></textarea>
      </div>
    </section>
  );
}
