// Dette komponent er programmeret af Anders og Mikkel

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import LoadingScreen from "../components/LoadingScreen";

export default function TaskDescription() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [profileImage, setProfileImage] = useState("/default-user.webp");
  const [userName, setUserName] = useState("Ukendt bruger");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const database = getDatabase();

  useEffect(() => {
    const fetchTaskData = async () => {
      const taskRef = ref(database, `tasks/${taskId}`);
      try {
        const snapshot = await get(taskRef);
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          setTask(taskData);
          if (taskData.userId) {
            await fetchUserData(taskData.userId);
          }
        } else {
          throw new Error("Opgaven blev ikke fundet.");
        }
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
        alert("Der skete en fejl under hentning af opgave. Prøv igen senere.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async (userId) => {
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setProfileImage(userData.profileImage || "/default-user.webp");
        setUserName(userData.name || "Ukendt bruger");
        setUserId(userId);
      }
    };

    fetchTaskData();
  }, [database, taskId]);

  if (loading) return <LoadingScreen />;

  if (!task) {
    return (
      <div>
        <h2>Opgaven blev ikke fundet.</h2>
        <button onClick={() => navigate("/")}>Gå tilbage til startsiden</button>
      </div>
    );
  }

  return (
    <main className="taskdescription">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img
          src="./tilbagepil.svg"
          alt="Tilbage"
          className="back-button-image"
        />
      </div>
      <div className="task-detail">
        {task.picture && (
          <img
            src={task.picture}
            alt="Billede uploadet af opgaven"
            style={{ width: "100%", height: "auto" }} // Tilføjet stil for at sikre responsivitet
          />
        )}
        <h1>{task.title || "Ingen titel angivet"}</h1>
        <p>{task.description || "Ingen beskrivelse tilgængelig"}</p>
      </div>
      <h4 className="task-dato">{task.date || "Ingen dato angivet"}</h4>
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
          <img src="./money.webp" alt="Pris ikon" />
          <h3>{task.price ? `${task.price} kr.` : "Ingen pris angivet"}</h3>
        </div>
        <div className="pris-dato2">
          <img src="./location.webp" alt="Placering ikon" />
          <h3>{task.location || "Ingen placering angivet"}</h3>
        </div>
      </div>

      <div className="task-buttons">
        <button onClick={() => alert("Du har budt på denne opgave")}>
          Byd på opgaven
        </button>
        <Link to={`/tasks/${taskId}/chat`} className="link">
          <button>Send besked</button>
        </Link>
      </div>

      <div className="user-opgave">
        {userId && (
          <Link to={`/task/${taskId}/userprofile/${userId}`}>
            <img src={profileImage} alt="Brugerprofil" />
          </Link>
        )}
        <div className="user-opgave1">
          <p>Denne opgave er oprettet af</p>
          {userId ? (
            <Link to={`/task/${taskId}/userprofile/${userId}`} className="link">
              <h5>{userName}</h5>
            </Link>
          ) : (
            <h5>{userName}</h5>
          )}
        </div>
      </div>
    </main>
  );
}
