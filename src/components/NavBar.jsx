import { Link } from "react-router-dom";

export default function NavBar({ activeClass, setActiveClass }) {
  return (
    <nav>
      <ul>
        <li className={activeClass === 0 ? "active" : ""}>
          <Link to="/hjem" onClick={() => setActiveClass(0)}>
            <img src="/home.webp" alt="Home icon" />
          </Link>
        </li>
        <li className={activeClass === 1 ? "active" : ""}>
          <Link to="/klaropgave" onClick={() => setActiveClass(1)}>
            <img src="/tasks.webp" alt="Tasks icon" />
          </Link>
        </li>
        <li className={activeClass === 2 ? "active" : ""}>
          <Link to="/opretopgave" onClick={() => setActiveClass(2)}>
            <img src="/addtask.webp" alt="Add task icon" />
          </Link>
        </li>
        <li className={activeClass === 3 ? "active" : ""}>
          <Link to="/profile" onClick={() => setActiveClass(3)}>
            <img src="/user.webp" alt="Bruger icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
