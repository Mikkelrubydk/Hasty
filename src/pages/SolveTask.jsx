import { useLocation } from "react-router-dom";

export default function SolveTask() {
  const location = useLocation();
  const { taskData } = location.state || {}; // Hent taskData fra location state

  // Sørg for at håndtere tilfælde, hvor der ikke er data
  if (!taskData) {
    return <div>Ingen opgave at vise</div>;
  }

  return (
  <section className="udfør-opgaver">
    <div>
      <img src={URL.createObjectURL(taskData.picture)} alt="Uploaded" />
    </div>
      <div>
        <div className="titel-pris">
          <h2>Titel: {taskData.title}</h2>
          <span><h4>{taskData.price}kr.</h4></span>
        </div>
        <div className="kategori">
          <span><h3>Kategori: {taskData.category}</h3></span>
        </div>
      </div>
  </section>
  );
}
