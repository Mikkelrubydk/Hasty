// Dette komponent er programmeret af Mikkel, Anders og Newroz

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import LoadingScreen from "../components/LoadingScreen";

export default function HomePage({ setActiveClass }) {
  const [tasks, setTasks] = useState([]);
  const database = getDatabase();
  const [activeIcon, setActiveIcon] = useState(0); // Indstil det aktive ikon til den første kategori som standard
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Indlæsningsstatus

  // Henter opgaver fra databasen, når komponentet indlæses
  useEffect(() => {
    const tasksRef = ref(database, "tasks");

    // Sætter loading til true, før data hentes
    setLoading(true);

    // Henter data fra Firebase
    // Mapper data til et array med unikke ID'er for hver opgave
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setTasks(tasksArray);

        // Filtrerer opgaver for "Håndværker"-kategorien
        const initialCategory = categories[0].name; // "Håndværker"
        const initialFilteredTasks = tasksArray.filter(
          (task) => task.category === initialCategory
        );
        setFilteredTasks(initialFilteredTasks);
      } else {
        setTasks([]);
        setFilteredTasks([]);
      }

      // Sætter loading til false, efter data er hentet
      setLoading(false);
    });

    // Oprydningsfunktion til at nulstille tasks og filteredTasks ved unmount
    return () => {
      setTasks([]);
      setFilteredTasks([]);
    };
  }, [database]);

  const categories = [
    // Liste over kategorier med tilhørende billede
    { name: "Håndværker", image: "./hammer.webp" },
    { name: "Havearbejde", image: "./pruning-shears.webp" },
    { name: "VVS", image: "./spanner.webp" },
    { name: "Flytning", image: "./box.webp" },
    { name: "Rengøring", image: "./cleaning.webp" },
    { name: "Servering", image: "./serving-dish.webp" },
    { name: "Mekaniker", image: "./gears.webp" },
    { name: "Cykel", image: "./wheel.webp" },
    { name: "Maling", image: "./paint-brush.webp" },
    { name: "Tech", image: "./laptop.webp" },
    { name: "EL-arbejde", image: "./wire.webp" },
    { name: "Begivenhed", image: "./event.webp" },
    { name: "Levering", image: "./laptop.webp" },
    { name: "Vinduer", image: "./window.webp" },
    { name: "Andet", image: "./question.webp" },
  ];

  const handleClick = (index) => {
    setActiveIcon(index);

    // Filtrerer opgaver baseret på den valgte kategori
    const selectedCategory = categories[index].name;
    const newFilteredTasks = tasks.filter(
      (task) => task.category === selectedCategory
    );
    setFilteredTasks(newFilteredTasks);
  };

  if (loading) {
    return <LoadingScreen />; // Viser indlæsningsskærm
  }

  return (
    <section className="homepage-container">
      <div>
        <figure>
          <img src="./logo.png" alt="Hasty logo" className="logo" />
          <Link to="/messages">
            <img
              src="./notifikation.svg"
              alt="Notifikationsikon"
              className="notification"
            />
          </Link>
        </figure>
        <article>
          <h1>få opgaver løst hurtigt, eller tilbyd din hjælp på ingen tid!</h1>
        </article>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Søg her.."></input>
        <img src="./search.webp" alt="Søgeikon" />
        <img src="./filter.webp" alt="Filterikon" />
      </div>

      <div className="task-container">
        <div className="task-text">
          <h2 className="overskrifter">Nyligt oprettede opgaver</h2>
          <Link
            to="/klaropgave"
            className="textlink"
            onClick={() => setActiveClass(1)}
          >
            <span>Vis alle</span>
          </Link>
        </div>
        <div className="task-wrapper">
          {tasks.slice(0, 4).map((task) => (
            <Link to={`/tasks/${task.id}`} className="link" key={task.id}>
              <div className="task-item">
                <div>
                  {task.picture ? (
                    <img src={task.picture} alt="Uploadet billede" />
                  ) : (
                    <p>Intet billede uploadet</p>
                  )}
                </div>
                <div>
                  <div className="titel-pris">
                    <h2>{task.title || "Ingen titel angivet"}</h2>
                    <span>
                      <h4>
                        {task.price
                          ? `${task.price} kr.`
                          : "Ingen pris angivet"}
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
        </div>
        <article>
          <h2 className="overskrifter">
            Find opgaver, der matcher dine kompetencer
          </h2>
          <div className="category-container">
            {categories.map((category, index) => (
              <div key={index} className="category-wrapper">
                <div
                  className={`boks ${activeIcon === index ? "active" : ""}`}
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
        </article>

        <div className="filtered-tasks">
          <div className="task-wrapper">
            {filteredTasks.map((task) => (
              <Link to={`/tasks/${task.id}`} className="link" key={task.id}>
                <div className="task-item">
                  <div>
                    {task.picture ? (
                      <img src={task.picture} alt="Uploadet billede" />
                    ) : (
                      <p>Intet billede uploadet</p>
                    )}
                  </div>
                  <div>
                    <div className="titel-pris">
                      <h2>{task.title || "Ingen titel angivet"}</h2>
                      <span>
                        <h4>
                          {task.price
                            ? `${task.price} kr.`
                            : "Ingen pris angivet"}
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
          </div>
        </div>
      </div>
    </section>
  );
}
