import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function StepThree() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [startDate, setStartDate] = useState(null); // Start med null for at vise "Vælg Dato"

  const formatDate = (date) => {
    if (!date) return "Vælg Dato"; // Hvis ingen dato er valgt, vis "Vælg Dato"
    const options = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("da-DK", options).format(date);
  };

  return (
    <section>
      <div className="stepthree-container">
        <h1 className="stepthreeh1">Dato & Sted</h1>
      </div>

      <div className="boks-container-stepthree">
        <div>
          <div
            className={`boks-stepthree ${activeIcon === 0 ? "active" : ""}`}
            onClick={() => setActiveIcon(0)}
          >
            <img src="/haster.webp" alt="Fast clock icon" />
          </div>
          <p className="undertekst-stepthree">Hurtigst muligt</p>
        </div>

        <div>
          <div
            className={`boks-stepthree ${activeIcon === 2 ? "active" : ""}`}
            onClick={() => setActiveIcon(2)}
          >
            <img src="/calender.webp" alt="Calender icon" />
          </div>
          <p className="undertekst-stepthree">Specifik dato</p>
        </div>
      </div>

      <div className="adresse-div">
        <h4>Adresse</h4>
        <div className="adresse-boks">
          <img src="/location.webp" alt="Location pin icon" />
          <input
            type="text"
            placeholder="Skriv her"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="dato-div">
        <h4>Vælg Dato</h4>
        <div className="dato-boks">
          <img src="/calender.webp" alt="Calender icon" />
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
