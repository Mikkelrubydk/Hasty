import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src="" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/klaropgave">
            <img src="" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/opretopgave">
            <img src="" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/profil">
            <img src="" alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
