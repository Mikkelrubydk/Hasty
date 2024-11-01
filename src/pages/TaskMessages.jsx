import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importer onAuthStateChanged
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function TaskMessages() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Tilføjet state til bruger-id
  const database = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Tjekker brugerens autentifikation
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Sætter bruger-id'et, hvis brugeren er logget ind
      } else {
        navigate("/login"); // Navigerer til login, hvis ingen bruger er logget ind
      }
    });

    return () => {
      unsubscribeAuth(); // Afmeld lytteren for autentifikation
    };
  }, [navigate]);

  useEffect(() => {
    if (!userId) return; // Stopper hvis bruger-id ikke er tilgængeligt

    const tasksRef = ref(database, "tasks");
    const unsubscribeTasks = onValue(
      tasksRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const allTasks = [];
          const tasksData = snapshot.val();

          Object.entries(tasksData).forEach(([taskId, taskData]) => {
            const taskMessagesRef = ref(database, `chats/${taskId}`);
            const unsubscribeMessages = onValue(
              taskMessagesRef,
              (messagesSnapshot) => {
                const messages = messagesSnapshot.val() || {};
                const hasMessages = Object.values(messages).length > 0;

                allTasks.push({
                  taskId,
                  title: taskData.title,
                  messages: hasMessages ? messages : {},
                  receiverId: taskData.userId,
                  isTaskOwner: taskData.userId === userId,
                });

                // Hvis alle opgaver er blevet behandlet, opdater state
                if (allTasks.length === Object.keys(tasksData).length) {
                  setTasks(allTasks);
                  setLoading(false);
                }
              }
            );

            return () => unsubscribeMessages(); // Afmeld beskedlytteren
          });
        } else {
          setTasks([]);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Fejl ved hentning af opgaver:", error);
        setError("Fejl ved hentning af opgaver: " + error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeTasks(); // Afmeld opgave-lytteren
    };
  }, [database, userId]); // Tilføjet userId som afhængighed

  if (loading) return <LoadingScreen />;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <main className="chatoversigt">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img
          src="/tilbagepil.svg"
          alt="Tilbage"
          className="back-button-image"
        />
      </div>
      <h1>Chatoversigt</h1>
      <div className="chatbeskeder">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.taskId}>
              <Link className="link" to={`/tasks/${task.taskId}/chat`}>
                <h2>{task.title}</h2>
                {Object.keys(task.messages).length > 0 ? (
                  <p>Der er beskeder til denne opgave.</p>
                ) : (
                  <p>Ingen beskeder tilgængelige.</p>
                )}
              </Link>
            </div>
          ))
        ) : (
          <p>Ingen opgaver tilgængelige.</p>
        )}
      </div>
    </main>
  );
}
