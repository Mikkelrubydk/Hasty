import { useState } from "react";
import { Link } from "react-router-dom";

export default function StepThree() {
  const [activeIcon, setActiveIcon] = useState(null);

  return (
    <section>
      <div className="btn-boks">
        <button className="image-button">
          <img src="/wire.webp" className="button-image" alt="Button Image" />
        </button>
      </div>
      <div className="stepthree-container">
        <div className="stepbystep-boks">
          <div className="filled3"></div>
        </div>
        <h1 className="stepthreeh1">Dato & Sted</h1>
      </div>

      <div className="boks-container-stepthree">
        <div>
          <div
            className={`boks-stepthree ${activeIcon === 0 ? "active" : ""}`}
            onClick={() => setActiveIcon(0)}
          >
            <img src="/hammer.webp" alt="Hammer" />
          </div>
          <p className="undertekst-stepthree">Haster</p>
        </div>

        <div>
          <div
            className={`boks-stepthree ${activeIcon === 1 ? "active" : ""}`}
            onClick={() => setActiveIcon(1)}
          >
            <img src="/pruning-shears.webp" alt="Havesaks" />
          </div>
          <p className="undertekst-stepthree">Fleksibel</p>
        </div>

        <div>
          <div
            className={`boks-stepthree ${activeIcon === 2 ? "active" : ""}`}
            onClick={() => setActiveIcon(2)}
          >
            <img src="/spanner.webp" alt="Spanner" />
          </div>
          <p className="undertekst-stepthree">Vælg dato</p>
        </div>
      </div>
    </section>
  );
}
