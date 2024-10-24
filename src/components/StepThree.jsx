import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StepThree({ taskData, handleInputChange }) {
  const [activeIcon, setActiveIcon] = useState(taskData.type || null); // Init med eksisterende type
  const [startDate, setStartDate] = useState(taskData.date || null); // Init med eksisterende dato
  const [address, setAddress] = useState(taskData.location || ""); // Init med eksisterende adresse

  // Formatér datoen til "dag måned"
  const formatDate = (date) => {
    if (!date) return "Vælg Dato"; // Standard tekst
    const options = { day: "numeric", month: "long" }; // Format til dag og måned
    return new Intl.DateTimeFormat("da-DK", options).format(date);
  };

  // Håndterer opdatering af taskData
  const handleNext = () => {
    // Gem type
    handleInputChange({ target: { name: "type", value: activeIcon } });
    // Gem dato
    handleInputChange({ target: { name: "date", value: startDate } });
    // Gem adresse
    handleInputChange({ target: { name: "location", value: address } });
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
            <img src="./haster.webp" alt="Fast clock icon" />
          </div>
          <p className="undertekst-stepthree">Hurtigst muligt</p>
        </div>

        <div>
          <div
            className={`boks-stepthree ${activeIcon === 1 ? "active" : ""}`}
            onClick={() => setActiveIcon(1)}
          >
            <img src="./calender.webp" alt="Calender icon" />
          </div>
          <p className="undertekst-stepthree">Specifik dato</p>
        </div>
      </div>

      <div className="adresse-div">
        <h4>Adresse</h4>
        <div className="adresse-boks">
          <img src="./location.webp" alt="Location pin icon" />
          <input
            type="text"
            placeholder="Skriv her"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="dato-div">
        <h4>Vælg Dato</h4>
        <div className="dato-boks">
          <img src="./calender.webp" alt="Calender icon" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-picker"
            placeholderText="Vælg en dato"
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
