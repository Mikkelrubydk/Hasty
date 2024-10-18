import { useState } from "react";
import { Link } from "react-router-dom";

export default function StepOne() {
  const [activeIcon, setActiveIcon] = useState(null);
  return (
    <section className="step1section">
      <h1 className="step1h1">Vælg Kategori</h1>

      <div className="boks-container">
        <div>
          <div
            className={`boks ${activeIcon === 0 ? "active" : ""}`}
            onClick={() => setActiveIcon(0)}
          >
            <img src="/hammer.webp" alt="Hammer" />
          </div>
          <p className="undertekst">Håndværker</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 1 ? "active" : ""}`}
            onClick={() => setActiveIcon(1)}
          >
            <img src="/pruning-shears.webp" alt="Havesaks" />
          </div>
          <p className="undertekst">Havearbejde</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 2 ? "active" : ""}`}
            onClick={() => setActiveIcon(2)}
          >
            <img src="/spanner.webp" alt="Spanner" />
          </div>
          <p className="undertekst">VVS</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 3 ? "active" : ""}`}
            onClick={() => setActiveIcon(3)}
          >
            <img src="/box.webp" alt="boks" />
          </div>
          <p className="undertekst">Flytning</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 4 ? "active" : ""}`}
            onClick={() => setActiveIcon(4)}
          >
            <img src="/cleaning.webp" alt="Rengøring" />
          </div>
          <p className="undertekst">Rengøring</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 5 ? "active" : ""}`}
            onClick={() => setActiveIcon(5)}
          >
            <img src="/serving-dish.webp" alt="Servering" />
          </div>
          <p className="undertekst">Servering</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 6 ? "active" : ""}`}
            onClick={() => setActiveIcon(6)}
          >
            <img src="/gears.webp" alt="Gear" />
          </div>
          <p className="undertekst">Mekaniker</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 7 ? "active" : ""}`}
            onClick={() => setActiveIcon(7)}
          >
            <img src="/wheel.webp" alt="Hjul" />
          </div>
          <p className="undertekst">Cykel</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 8 ? "active" : ""}`}
            onClick={() => setActiveIcon(8)}
          >
            <img src="/paint-brush.webp" alt="Malerpensel" />
          </div>
          <p className="undertekst">Maling</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 9 ? "active" : ""}`}
            onClick={() => setActiveIcon(9)}
          >
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p className="undertekst">Tech</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 10 ? "active" : ""}`}
            onClick={() => setActiveIcon(10)}
          >
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p className="undertekst">EL-arbejde</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 11 ? "active" : ""}`}
            onClick={() => setActiveIcon(11)}
          >
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p className="undertekst">Begivenhed</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 12 ? "active" : ""}`}
            onClick={() => setActiveIcon(12)}
          >
            <img src="/laptop.webp" alt="Bærbar" />
          </div>
          <p className="undertekst">Levering</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 13 ? "active" : ""}`}
            onClick={() => setActiveIcon(13)}
          >
            <img src="/wire.webp" alt="Ledning" />
          </div>
          <p className="undertekst">Vinduer</p>
        </div>

        <div>
          <div
            className={`boks ${activeIcon === 14 ? "active" : ""}`}
            onClick={() => setActiveIcon(14)}
          >
            <img src="/event.webp" alt="Begivenhed" />
          </div>
          <p className="undertekst">Andet</p>
        </div>
      </div>
    </section>
  );
}
