import { Link } from "react-router-dom";

export default function StepFive() {
  return (
    <section className="step2section">
      <div className="stepbystep-boks">
        <div className="filled5"></div>
      </div>

      <h1 className="step1h1">Færdigørelse</h1>
      <div className="beskriv-boks">
        <textarea className="tekst" placeholder="Tilføj billede, hvis relevant"></textarea>
      </div>
      <h2 className="prish2">Startpris</h2>
      <div className="pris-boks">
      <textarea className="pris-tekst" placeholder="Angiv pris"></textarea>
      </div>
    </section>
  );
}
