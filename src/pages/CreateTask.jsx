// Dette komponent er programmeret af Anders og Mikkel

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, push } from "firebase/database";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import { getAuth } from "firebase/auth";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import StepFive from "../components/StepFive";

export default function CreateTask({ setActiveClass }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    date: "",
    location: "",
    type: "",
    picture: null,
    userId: "",
  });
  const navigate = useNavigate();
  const database = getDatabase();
  const auth = getAuth();
  const progressWidth = (step / totalSteps) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTaskData((prevData) => ({ ...prevData, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Kun billedfiler er tilladt.");
    }
  };

  const handleCategoryChange = (category) => {
    setTaskData((prevData) => ({ ...prevData, category }));
  };

  const validateTaskData = () => {
    const { title, description, category, price, date, location, picture } =
      taskData;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !date ||
      !location ||
      !picture
    ) {
      alert(`Alle felter skal udfyldes.`);
      return false;
    }
    return true;
  };

  const saveTaskToFirebase = async (task) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Ingen bruger er logget ind.");
      return;
    }

    try {
      const taskRef = ref(database, `tasks`);
      const newTaskRef = push(taskRef);
      await set(newTaskRef, task);
      console.log("Opgave gemt i Firebase:", task);
    } catch (error) {
      console.error("Fejl ved gemme opgave i Firebase: ", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateTaskData()) return;
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Ingen bruger er logget ind.");
        return;
      }

      const updatedTaskData = {
        ...taskData,
        userId: user.uid,
      };

      await saveTaskToFirebase(updatedTaskData);
      console.log("Opgaven er gemt i Firebase:", updatedTaskData);

      setActiveClass(1);
      navigate("/klaropgave", { state: { taskData: updatedTaskData } });
    } catch (error) {
      console.error("Fejl ved indsendelse af opgave:", error);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            taskData={taskData}
            handleCategoryChange={handleCategoryChange}
          />
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
            handleNext={handleNext} // Kald den overordnede handleNext
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
            handleImageChange={handleImageChange}
          />
        );
      default:
        return (
          <StepOne
            taskData={taskData}
            handleCategoryChange={handleCategoryChange}
          />
        );
    }
  };

  return (
    <div className="create-task-container">
      <div className="stepbystep-boks">
        <div
          className="filled"
          style={{ width: `${progressWidth}%`, transition: "width 0.5s ease" }}
        ></div>
      </div>
      {renderStep()}
      {step < totalSteps && (
        <button className="nextbtn" onClick={handleNext}>
          Næste
        </button>
      )}
      {step > 1 && (
        <button className="previousbtn" onClick={() => setStep(step - 1)}>
          <img src="./tilbagepil.svg" alt="Tilbage Knap" />
        </button>
      )}
      {step === totalSteps && (
        <button className="submitbtn" onClick={handleSubmit}>
          Opret opgave
        </button>
      )}
    </div>
  );
}
