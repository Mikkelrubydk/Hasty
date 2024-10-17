import { useState } from "react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";

export default function CreateTask({ setActiveClass }) {
  const [step, setStep] = useState(1);

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
    <div>
      {renderStep()}

      {/* Næste knap */}
      <button className="nextbtn" onClick={() => setStep(step + 1)}>
        Næste
      </button>

      {/* Sørger for at previousbtn fremgår på alle sider undtagen stepOne */}
      {step > 1 && (
        <button className="previousbtn" onClick={() => setStep(step - 1)}>
          <img src="/tilbagepil.svg" alt="Tilbage Knap" />
        </button>
      )}
    </div>
  );
}
