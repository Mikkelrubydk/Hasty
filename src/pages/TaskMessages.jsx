import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function TaskMessages({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state
  const database = getDatabase();

  useEffect(() => {
    const tasksRef = ref(database, `tasks`);

    const unsubscribe = onValue(
      tasksRef,
      (snapshot) => {
        setLoading(false); // Stop loading
        if (snapshot.exists()) {
          const allTasks = Object.keys(snapshot.val())
            .map((taskId) => {
              const taskData = snapshot.val()[taskId];

              // Find chat data for each task
              const chatRef = ref(database, `chats/${taskId}`);
              const messagesSnapshot = snapshot.val()[taskId].messages || {};

              // Find last message
              const lastMessageData =
                Object.values(messagesSnapshot).pop() || {};
              const lastMessage = lastMessageData.message || "Ingen beskeder";

              // Return task data if user is involved
              if (taskData.userId === userId || taskData.partnerId === userId) {
                return {
                  taskId,
                  title: taskData.title,
                  partnerId:
                    taskData.userId === userId
                      ? taskData.partnerId
                      : taskData.userId,
                  lastMessage,
                };
              }
              return null;
            })
            .filter((task) => task !== null);

          setTasks(allTasks);
        } else {
          setTasks([]); // Ingen opgaver
        }
      },
      (error) => {
        setLoading(false); // Stop loading
        setError(error.message); // Sæt fejlmeddelelse
      }
    );

    return () => unsubscribe();
  }, [database, userId]);

  if (loading) return <LoadingScreen />; // Loader-tilstand
  if (error) return <p>Fejl: {error}</p>; // Fejlmeddelelse

  return (
    <main>
      <h1>Dine Beskeder</h1>
      <div>
        {tasks.map((task) => (
          <div key={task.taskId}>
            <Link to={`/tasks/${task.taskId}/chat`}>
              <h2>{task.title}</h2>
              <p>Chat med: {task.partnerId}</p>
              <p>Seneste besked: {task.lastMessage}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
