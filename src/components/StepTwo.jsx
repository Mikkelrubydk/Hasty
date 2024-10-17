import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
<section className="step1section">
  <button class="image-button">
    <img src="/wire.webp" class="button-image" alt="Button Image"/>
  </button>
  <div className="stepbystep-boks">
    <div className="filled2"></div>
  </div>

  <h1 className="step1h1">Beskriv din opgave</h1>

  <div class="beskriv-boks">
  <textarea class="tekst" placeholder="Beskriv her..."></textarea>
</div>
</section>
  );
}
