import { Link, useLocation } from "react-router-dom";

export default function SolveTask() {
  const location = useLocation();
  const { taskData } = location.state || {}; // Hent taskData fra location state

  // Sørg for at håndtere tilfælde, hvor der ikke er data
  if (!taskData) {
    return <div>Ingen opgave at vise</div>;
  }

  return (
  <article>
    <Link to="/">
    <button className="previousbtn">
    <img src="./tilbagepil.svg" alt="Tilbage Knap" />
  </button>
  </Link>
    <div className="search-bar2">
      <input type="text" placeholder="Søg her.."></input>
      <img src="/search.webp" alt="Search icon" />
      <img src="/filter.webp" alt="Filter icon" />
    </div>
    <h1 className="solvetaskh1">Alle Opgaver</h1>
    <p className="åben-opgaver">Åbne opgaver</p>
      <section className="udfør-opgaver">
        <div>
          <img src={URL.createObjectURL(taskData.picture)} alt="Uploaded" />
        </div>
          <div>
            <div className="titel-pris">
              <h2>Titel: {taskData.title}</h2>
              <span><h4>{taskData.price} kr.</h4></span>
            </div>
            <div className="kategori">
              <span><h3>Kategori: {taskData.category}</h3></span>
            </div>
          </div>
      </section>
  </article>
  );
}
