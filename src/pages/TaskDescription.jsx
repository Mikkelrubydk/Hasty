import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import LoadingScreen from "../components/LoadingScreen"; // Sørg for, at denne komponent er korrekt placeret

export default function TaskDescription() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [profileImage, setProfileImage] = useState("/default-user.webp"); // Sæt en standard værdi
  const [userName, setUserName] = useState("Ukendt bruger"); // Sæt en standard værdi
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const database = getDatabase();

  useEffect(() => {
    const taskRef = ref(database, `tasks/${taskId}`);

    // Hent opgavedata
    get(taskRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          setTask(taskData);

          // Hent brugerens profilbillede og navn baseret på userId, hvis den findes
          if (taskData.userId) {
            const userRef = ref(database, `users/${taskData.userId}`);

            return get(userRef).then((userSnapshot) => {
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                setProfileImage(userData.profileImage || "/default-user.webp");
                setUserName(userData.name || "Ukendt bruger");
              } else {
                console.log("Ingen data fundet for denne bruger");
              }
            });
          }
        } else {
          console.log("Ingen data tilgængelig for denne opgave");
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
      })
      .finally(() => {
        setLoading(false); // Indstil loading til false, når data er indlæst
      });
  }, [database, taskId]);

  if (loading) return <LoadingScreen />; // Vis loading skærm

  return (
    <main className="taskdescription">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img src="/tilbagepil.svg" alt="" className="back-button-image" />
      </div>
      <div className="task-detail">
        {task.picture && <img src={task.picture} alt="Billede uploadet" />}
        <h1>{task.title || "Ingen titel angivet"}</h1>
        <p>{task.description || "Ingen beskrivelse tilgængelig"}</p>
      </div>
      <h4 className="task-dato">{task.date}</h4>
      <hr className="black-line" />

      <div className="three-boxes-container">
        <div className="box1">
          <h2>Åben</h2>
        </div>
        <div className="box">
          <h2>Tildelt</h2>
        </div>
        <div className="box">
          <h2>Færdig</h2>
        </div>
      </div>

      <div className="pris-dato">
        <div className="pris-dato1">
          <img src="/money.webp" alt="Pris ikon" />
          <h3>{task.price ? `${task.price} kr.` : "Ingen pris angivet"}</h3>
        </div>
        <div className="pris-dato2">
          <img src="/location.webp" alt="Placering ikon" />
          <h3>{task.location}</h3>
        </div>
      </div>

      <div className="task-buttons">
        <button onClick={() => alert("Du har budt på denne opgave")}>
          Byd på opgaven
        </button>
        <button onClick={() => alert("Besked sendt til opgaveudbyderen")}>
          Send besked
        </button>
      </div>

      <div className="user-opgave">
        <img src={profileImage} alt="Brugerprofil" />
        <div className="user-opgave1">
          <p>Denne opgave er oprettet af</p>
          <h5>{userName}</h5>
        </div>
      </div>
    </main>
  );
}
