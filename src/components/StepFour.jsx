import { Link } from "react-router-dom";

export default function StepFour() {
  return (
    <section className="step2section">
      <div className="stepbystep-boks">
        <div className="filled4"></div>
      </div>

      <h1 className="step1h1">Uddyb beskrivelse</h1>
      <h3>Uddybende beskrivelse af opgaven, så opgaven kan blive løst lige som du ønsker det</h3>
      <div className="beskriv-boks">
        <textarea className="tekst" placeholder="Beskriv her..."></textarea>
      </div>
    </section>
  );
}
