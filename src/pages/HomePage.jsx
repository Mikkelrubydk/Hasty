import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export default function HomePage({ setActiveClass }) {
  const [tasks, setTasks] = useState([]);
  const database = getDatabase();
  const [activeIcon, setActiveIcon] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(database, "tasks");

    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setTasks(tasksArray);
        setFilteredTasks(tasksArray); // Set filtered tasks to all tasks initially
      } else {
        setTasks([]);
        setFilteredTasks([]);
      }
    });

    return () => {
      setTasks([]);
      setFilteredTasks([]);
    };
  }, [database]);

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
    { name: "Vinduer", image: "/wire.webp" },
    { name: "Andet", image: "/event.webp" },
  ];

  const handleClick = (index) => {
    setActiveIcon(index);

    // Filter tasks based on the selected category
    const selectedCategory = categories[index].name;
    const newFilteredTasks = tasks.filter(
      (task) => task.category === selectedCategory
    );
    setFilteredTasks(newFilteredTasks);
  };

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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
