// Dette komponent er programmeret af Anders og Mikkel

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Importer Firebase-funktioner
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function SolveTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Tilstand til at spore indlæsning
  const [activeCategories, setActiveCategories] = useState([]); // Array til aktive kategorier
  const [filteredTasks, setFilteredTasks] = useState([]); // Tilstand til filtrerede opgaver
  const database = getDatabase(); // Firebase-database reference

  const categories = [
    { name: "Håndværker", image: "/hammer.webp" },
    { name: "Havearbejde", image: "/pruning-shears.webp" },
    { name: "VVS", image: "/spanner.webp" },
    { name: "Flytning", image: "/box.webp" },
    { name: "Rengøring", image: "/cleaning.webp" },
    { name: "Servering", image: "/serving-dish.webp" },
    { name: "Mekaniker", image: "/gears.webp" },
    { name: "Cykel", image: "/wheel.webp" },
    { name: "Maling", image: "/paint-brush.webp" },
    { name: "Tech", image: "/laptop.webp" },
    { name: "EL-arbejde", image: "/wire.webp" },
    { name: "Begivenhed", image: "/event.webp" },
    { name: "Levering", image: "/laptop.webp" },
    { name: "Vinduer", image: "/window.webp" },
    { name: "Andet", image: "/question.webp" },
  ];

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
        setFilteredTasks(tasksArray); // Sæt initial filtrering af opgaver til at vise alle opgaver
      } else {
        setTasks([]); // Ingen opgaver fundet
      }
      setLoading(false); // Sæt loading til false efter at have hentet data
    });

    return () => {
      setTasks([]); // Ryd op, når komponenten unmountes
    };
  }, [database]);

  // Håndter klik på kategori
  const handleClick = (index) => {
    const selectedCategory = categories[index].name;

    if (activeCategories.includes(selectedCategory)) {
      // Hvis kategorien allerede er valgt, fjern den fra aktive kategorier
      setActiveCategories(
        activeCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      // Hvis kategorien ikke er valgt, tilføj den til aktive kategorier
      setActiveCategories([...activeCategories, selectedCategory]);
    }
  };

  useEffect(() => {
    // Filtrer opgaver baseret på de valgte kategorier
    const newFilteredTasks = tasks.filter((task) => {
      // Hvis der ikke er aktive kategorier, skal alle opgaver vises
      if (activeCategories.length === 0) return true;
      return activeCategories.includes(task.category);
    });
    setFilteredTasks(newFilteredTasks);
  }, [activeCategories, tasks]);

  // Hvis Firebase data indlæser, vis loadingScreen
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section className="udfør-opgaver">
      <h1 className="step1h1">Opgaveoversigt</h1>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-wrapper">
            <div
              className={`boks ${
                activeCategories.includes(category.name) ? "active" : ""
              }`} // Tilføj active klasse baseret på aktive kategorier
              onClick={() => handleClick(index)}
            >
              <img src={category.image} alt={category.name} />
              <div>
                <p className="undertekst">{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.map((task) => (
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
