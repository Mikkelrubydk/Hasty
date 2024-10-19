import { useLocation } from "react-router-dom";

export default function SolveTask() {
  const location = useLocation();
  const { taskData } = location.state || {}; // Hent taskData fra location state

  // Sørg for at håndtere tilfælde, hvor der ikke er data
  if (!taskData) {
    return <div>Ingen opgave at vise</div>;
  }

  return (
    <section>
      <h1>Opgave Detaljer</h1>
      <h2>Titel: {taskData.title}</h2>
      <h3>Kategori: {taskData.category}</h3>
      <h4>Beskrivelse: {taskData.description}</h4>
      <h4>Pris: {taskData.price}</h4>
      <h4>Dato: {taskData.date}</h4>
      <h4>Lokation: {taskData.location}</h4>
      <h4>Type: {taskData.type}</h4>
      {taskData.picture && (
        <div>
          <h4>Billede:</h4>
          <img src={URL.createObjectURL(taskData.picture)} alt="Uploaded" />
        </div>
      )}
    </section>
  );
}
