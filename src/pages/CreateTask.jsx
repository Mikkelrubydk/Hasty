export default function CreateTask() {
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
