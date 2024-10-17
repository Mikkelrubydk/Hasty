import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
    <section className="step2section">
      <button className="image-button">
        <img src="/wire.webp" class="button-image" alt="Button Image" />
      </button>
      <div className="stepbystep-boks">
        <div className="filled2"></div>
      </div>

      <h1 className="step1h1">Beskriv din opgave</h1>
      <h3>Kort beskrivelse af opgaven</h3>
      <div className="beskriv-boks">
        <textarea class="tekst" placeholder="Beskriv her..."></textarea>
      </div>
    </section>
  );
}
