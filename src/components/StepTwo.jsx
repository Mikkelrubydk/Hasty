import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
    <section className="step2section">
      <div className="stepbystep-boks">
        <div className="filled2"></div>
      </div>

      <h1 className="step1h1">Beskriv din opgave</h1>
      <h3>Kort beskrivelse af opgaven</h3>
      <div className="beskriv-boks">
        <textarea className="tekst" placeholder="Beskriv her..."></textarea>
      </div>
    </section>
  );
}
