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
          <div className="boks">
            <img src="/hammer.webp" alt="Hammer" />
          </div>
          <p className="undertekst">Håndværker</p>
        </div>

        <div>
          <div className="boks">
            <img src="/pruning-shears.webp" alt="Havesaks" />
          </div>
          <p className="undertekst">Havearbejde</p>
        </div>

        <div>
          <div className="boks">
            <img src="/spanner.webp" alt="Spanner" />
          </div>
          <p className="undertekst">VVS</p>
        </div>

        <div>
          <div className="boks">
            <img src="/box.webp" alt="boks" />
          </div>
          <p className="undertekst">Flytning</p>
        </div>

        <div>
          <div className="boks">
            <img src="/cleaning.webp" alt="Rengøring" />
          </div>
          <p className="undertekst">Rengøring</p>
        </div>

        <div>
          <div className="boks">
            <img src="/serving-dish.webp" alt="Servering" />
          </div>
          <p className="undertekst">Servering</p>
        </div>

        <div>
          <div className="boks">
            <img src="/gears.webp" alt="Gear" />
          </div>
          <p className="undertekst">Mekaniker</p>
        </div>

        <div>
          <div className="boks">
            <img src="/wheel.webp" alt="Hjul" />
          </div>
          <p className="undertekst">Cykel</p>
        </div>

        <div>
          <div className="boks">
            <img src="/paint-brush.webp" alt="Malerpensel" />
          </div>
          <p className="undertekst">Maling</p>
        </div>

        <div>
          <div className="boks">
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p className="undertekst">Tech</p>
        </div>

        <div>
          <div className="boks">
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p className="undertekst">EL-arbejde</p>
        </div>

        <div>
          <div className="boks">
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p className="undertekst">Begivenhed</p>
        </div>

        <div>
          <div className="boks">
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p className="undertekst">Levering</p>
        </div>

        <div>
          <div className="boks">
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p className="undertekst">Vinduer</p>
        </div>

        <div>
          <div className="boks">
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p className="undertekst">Andet</p>
        </div>
      </div>
    </section>
  );
}
