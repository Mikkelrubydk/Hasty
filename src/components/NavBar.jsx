import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [activeClass, setActiveClass] = useState(null);

  const handleClick = (index) => {
    setActiveClass(index);
  };

  return (
    <nav>
      <ul>
        <li className={activeClass === 0 ? "active" : ""}>
          <Link to="/hjem" onClick={() => handleClick(0)}>
            <img src="/home.webp" alt="Home icon" />
          </Link>
        </li>
        <li className={activeClass === 1 ? "active" : ""}>
          <Link to="/klaropgave" onClick={() => handleClick(1)}>
            <img src="/tasks.webp" alt="Tasks icon" />
          </Link>
        </li>
        <li className={activeClass === 2 ? "active" : ""}>
          <Link to="/opretopgave" onClick={() => handleClick(2)}>
            <img src="/addtask.webp" alt="Add task icon" />
          </Link>
        </li>
        <li className={activeClass === 3 ? "active" : ""}>
          <Link to="/profil" onClick={() => handleClick(3)}>
            <img src="/user.webp" alt="Bruger icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
