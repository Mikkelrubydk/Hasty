import { useState } from "react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";

export default function CreateTask({ setActiveClass }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Beregn bredden af processbaren baseret på det aktuelle trin
  const progressWidth = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne />;
    }
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
    </div>
  );
}
