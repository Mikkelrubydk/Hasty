import { Link } from "react-router-dom";

export default function StepOne() {
  return (
    <section className="step1section">
      <div className="stepbystep-boks">
        <div className="filled"></div>
      </div>

      <h1 className="step1h1">Vælg Kategori</h1>

      <div className="boks-container">
        <div>
          <div class="boks">
            <img src="/hammer.webp" alt="Hammer" />
          </div>
          <p class="undertekst">Håndværker</p>
        </div>

        <div>
          <div class="boks">
            <img src="/spanner.webp" alt="Spanner" />
          </div>
          <p class="undertekst">VVS</p>
        </div>

        <div>
          <div class="boks">
            <img src="/pruning-shears.webp" alt="Havesaks" />
          </div>
          <p class="undertekst">Havearbejde</p>
        </div>

        <div>
          <div class="boks">
            <img src="/box.webp" alt="boks" />
          </div>
          <p class="undertekst">Håndværker</p>
        </div>

        <div>
          <div class="boks">
            <img src="/cleaning.webp" alt="Rengøring" />
          </div>
          <p class="undertekst">VVS</p>
        </div>

        <div>
          <div class="boks">
            <img src="/serving-dish.webp" alt="Servering" />
          </div>
          <p class="undertekst">Havearbejde</p>
        </div>

        <div>
          <div class="boks">
            <img src="/gears.webp" alt="Gear" />
          </div>
          <p class="undertekst">Håndværker</p>
        </div>

        <div>
          <div class="boks">
            <img src="/wheel.webp" alt="Hjul" />
          </div>
          <p class="undertekst">VVS</p>
        </div>

        <div>
          <div class="boks">
            <img src="/paint-brush.webp" alt="Malerpensel" />
          </div>
          <p class="undertekst">Havearbejde</p>
        </div>

        <div>
          <div class="boks">
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p class="undertekst">Håndværker</p>
        </div>

        <div>
          <div class="boks">
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p class="undertekst">VVS</p>
        </div>

        <div>
          <div class="boks">
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p class="undertekst">Havearbejde</p>
        </div>

        <div>
          <div className="boks">
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p className="undertekst">Håndværker</p>
        </div>

        <div>
          <div className="boks">
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p className="undertekst">VVS</p>
        </div>

        <div>
          <div className="boks">
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p className="undertekst">Havearbejde</p>
        </div>
      </div>
    </section>
  );
}
