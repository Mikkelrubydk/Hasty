import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";

export default function CreateTask({ setActiveClass }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // TaskData initialiseret med alle felter
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    date: "",
    location: "",
    type: "",
    picture: null, // For billede-upload i Step 5
  });

  const navigate = useNavigate();

  // Beregn bredden af processbaren baseret på det aktuelle trin
  const progressWidth = (step / totalSteps) * 100;

  // Håndter ændring i input felter (tekst)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Håndter billede-upload specifikt for Step 5
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Få adgang til den uploadede fil
    setTaskData((prevData) => ({ ...prevData, picture: file }));
  };

  // Håndter rendering af hvert trin
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne taskData={taskData} handleInputChange={handleInputChange} />
        );
      case 2:
        return (
          <StepTwo taskData={taskData} handleInputChange={handleInputChange} />
        );
      case 3:
        return (
          <StepThree
            taskData={taskData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <StepFour taskData={taskData} handleInputChange={handleInputChange} />
        );
      case 5:
        return (
          <StepFive
            taskData={taskData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange} // Tilføj billede-upload
          />
        );
      default:
        return (
          <StepOne taskData={taskData} handleInputChange={handleInputChange} />
        );
    }
  };

  // Håndter indsendelse af opgave og naviger til SolveTask siden
  const handleSubmit = () => {
    setActiveClass(1);
    navigate("/klaropgave", { state: { taskData } });
    console.log("Opgaven er indsendt:", taskData);
  };

  return (
    <div className="create-task-container">
      {/* Processbar */}
      <div className="stepbystep-boks">
        <div
          className="filled"
          style={{ width: `${progressWidth}%`, transition: "width 0.5s ease" }}
        ></div>
      </div>

      {/* Rendering af aktuelt Step */}
      {renderStep()}

      {/* Næste knap */}
      {step < totalSteps && (
        <button className="nextbtn" onClick={() => setStep(step + 1)}>
          Næste
        </button>
      )}

      {/* Previous knap, der kun vises hvis step > 1 */}
      {step > 1 && (
        <button className="previousbtn" onClick={() => setStep(step - 1)}>
          <img src="/tilbagepil.svg" alt="Tilbage Knap" />
        </button>
      )}

      {/* Udfør opgaven og gå videre til SolveTask */}
      {step === totalSteps && (
        <button className="submitbtn" onClick={handleSubmit}>
          Opret opgave
        </button>
      )}
    </div>
  );
}
