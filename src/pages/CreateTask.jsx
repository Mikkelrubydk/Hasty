import StepOne from "../components/StepOne";

export default function CreateTask({ setActiveClass }) {
  const [step, setStep] = useState(1);

  // Step by step CreateTask

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
      <button onClick={() => setStep(step + 1)}>Næste</button>
    </div>
  );
}
