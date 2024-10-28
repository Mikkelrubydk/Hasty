import { Link } from "react-router-dom";
import TaskDescription from "./TaskDescription";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Import Firebase functions

export default function HomePage({ setActiveClass }) {
  const [tasks, setTasks] = useState([]);
  const database = getDatabase(); // Firebase database reference

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
    });

    // Cleanup function for at undgå memory leaks
    return () => {
      setTasks([]); // Ryd op, når komponenten unmountes
    };
  }, [database]); // Afhængighed for useEffect

  return (
    <section className="homepage-container">
      <div>
        <figure>
          <img src="/logo.svg" alt="Hasty logo" className="logo" />
          <img
            src="/notifikation.svg"
            alt="Notification icon"
            className="notification"
          />
        </figure>
        <article>
          <h1>få opgaver løst hurtigt, eller tilbyd din hjælp på ingen tid!</h1>
        </article>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Søg her.."></input>
        <img src="/search.webp" alt="Search icon" />
        <img src="/filter.webp" alt="Filter icon" />
      </div>
      <div className="category-container">
        <div className="category-text">
          <h2>Kategorier</h2>
          <Link
            to="/klaropgave"
            className="textlink"
            onClick={() => setActiveClass(1)}
          >
            <span>Vis alle</span>
          </Link>
        </div>
        <div className="category-wrapper">
          <figure>
            <div className="shadow">
              <img src="/hammer.webp" alt="Hammer icon" />
            </div>
            <figcaption>Håndværker</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/spanner.webp" alt="VVS icon" />
            </div>
            <figcaption>VVS</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/pruning-shears.webp" alt="Havearbejde icon" />
            </div>
            <figcaption>Havearbejde</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/box.webp" alt="Flyning icon" />
            </div>
            <figcaption>Flytning</figcaption>
          </figure>
        </div>
      </div>

      <div className="task-container">
        <div className="task-text">
          <h2>Nyligt oprettede opgaver</h2>
          <Link
            to="/klaropgave"
            className="textlink"
            onClick={() => setActiveClass(1)}
          >
            <span>Vis alle</span>
          </Link>
        </div>
        <div className="task-wrapper">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
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
          ))}
        </div>
      </div>
    </section>
  );
}
