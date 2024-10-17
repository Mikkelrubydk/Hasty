import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

export default function StepThree() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [address, setAddress] = useState("Skriv her...");
  const [startDate, setStartDate] = useState(null); // Start med null for at vise "Vælg Dato"

  const formatDate = (date) => {
    if (!date) return "Vælg Dato"; // Hvis ingen dato er valgt, vis "Vælg Dato"
    const options = { day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('da-DK', options).format(date);
  };

  return (
    <section>
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

      <div className="adresse-div">
        <h4>Adresse</h4>
        <div className="adresse-boks">
          <img src="/box.webp" alt="Maps" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="dato-div">
        <h4>Vælg Dato</h4>
        <div className="dato-boks">
          <img src="/box.webp" alt="Maps" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-picker"
            placeholderText="Vælg Dato"
            customInput={
              <input
                type="text"
                value={formatDate(startDate)}
                readOnly
                className="date-input"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
