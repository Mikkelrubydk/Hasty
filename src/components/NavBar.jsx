// Dette komponent er programmeret af Mikkel

import { Link } from "react-router-dom";

export default function NavBar({ activeClass, setActiveClass }) {
  const currentClass = parseInt(activeClass, 10);

  return (
    <nav>
      <ul>
        <li className={currentClass === 0 ? "active" : ""}>
          <Link to="/" onClick={() => setActiveClass(0)}>
            <img src="./home.webp" alt="Home icon" />
          </Link>
        </li>
        <li className={currentClass === 1 ? "active" : ""}>
          <Link to="/klaropgave" onClick={() => setActiveClass(1)}>
            <img src="./tasks.webp" alt="Tasks icon" />
          </Link>
        </li>
        <li className={currentClass === 2 ? "active" : ""}>
          <Link to="/opretopgave" onClick={() => setActiveClass(2)}>
            <img src="./addtask.webp" alt="Add task icon" />
          </Link>
        </li>
        <li className={currentClass === 3 ? "active" : ""}>
          <Link to="/profile" onClick={() => setActiveClass(3)}>
            <img src="./user.webp" alt="Bruger icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
