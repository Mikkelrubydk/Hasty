import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

export default function TaskDescription() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const database = getDatabase();

  useEffect(() => {
    const taskRef = ref(database, `tasks/${taskId}`);

    get(taskRef).then((snapshot) => {
      if (snapshot.exists()) {
        setTask(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, [database, taskId]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
            <div className="task-detail">
            <h4 className="task-dato">{task.date}</h4>
              {task.picture && <img src={task.picture} alt="Uploaded" />}
              <h1>{task.title || "Ingen titel angivet"}</h1>
              <p>{task.description || "Ingen beskrivelse tilgængelig"}</p>
              </div>
              <hr class="black-line" />
              <div className="three-boxes-container">
            <div className="box">
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
            <img src="/location.webp" alt="" />
            <h3>{task.price ? `${task.price} kr.` : "Ingen pris angivet"}</h3>
            </div>
            <div className="pris-dato2">
            <img src="/location.webp" alt="" />
            <h3>{task.location}</h3>
            </div>
          </div>
        

      <div className="task-buttons">
        <button onClick={() => alert("Du har budt på denne opgave")}>
          Byd på den opgave
        </button>
        <button onClick={() => alert("Besked sendt til opgaveudbyderen")}>
          Send besked
        </button>
      </div>
      <div className="user-opgave">
        <img src="/default-user.webp" alt="" />
        <div className="user-opgave1">
          <p>Denne opgave er oprettet af</p>
          <h5>Anders Flæng</h5>
        </div>
      </div>
    </div>
  );
}
