import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Importer Firebase-funktioner
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function SolveTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Tilstand til at spore indlæsning
  const database = getDatabase(); // Firebase-database reference

  useEffect(() => {
    const tasksRef = ref(database, "tasks"); // Reference til tasks i Firebase

    // Lyt til ændringer i Firebase-databasen
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key, // Gem ID for at kunne bruge det som key i render
        }));
        setTasks(tasksArray); // Opdater state med de hentede opgaver
      } else {
        setTasks([]); // Ingen opgaver fundet
      }
      setLoading(false); // Sæt loading til false efter at have hentet data
    });

    // Cleanup-funktion for at undgå hukommelseslækager
    return () => {
      setTasks([]); // Ryd op, når komponenten unmountes
    };
  }, [database]); // Afhængighed for useEffect

  // Hvis vi stadig indlæser data, vis en loading-skærm
  if (loading) {
    return <LoadingScreen />; // Indsæt din egen loading-skærm her
  }

  return (
    <section className="udfør-opgaver">
      <h1 className="step1h1">Opgaveoversigt</h1>
      {tasks.map((task) => (
        <Link className="link" to={`/tasks/${task.id}`} key={task.id}>
          <div className="task-item">
            <div>
              {task.picture ? (
                <img src={task.picture} alt="Uploaded" />
              ) : (
                <p>Intet billede uploadet</p>
              )}
            </div>
            <div>
              <div className="titel-pris">
                <h2>{task.title || "Ingen titel angivet"}</h2>
                <span>
                  <h4>
                    {task.price ? `${task.price} kr.` : "Ingen pris angivet"}
                  </h4>
                </span>
              </div>
              <div className="kategori">
                <span>
                  <h3>{task.category || "Ingen kategori angivet"}</h3>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
