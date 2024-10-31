import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function TaskMessages({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const database = getDatabase();

  useEffect(() => {
    const tasksRef = ref(database, `tasks`);

    const unsubscribe = onValue(
      tasksRef,
      (snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const allTasks = Object.keys(snapshot.val()).map((taskId) => {
            const taskData = snapshot.val()[taskId];
            const chatId = taskData.chatId; // Hent chatId fra opgaven
            const messagesRef = ref(database, `chats/${chatId}`); // Reference til chatten

            return new Promise((resolve) => {
              onValue(messagesRef, (messagesSnapshot) => {
                const messages = messagesSnapshot.val() || {};

                // Filtrer relevante beskeder
                const relevantMessages = Object.values(messages).filter(
                  (msg) => msg.senderId === userId || msg.receiverId === userId
                );

                // Ingen lastMessage, vi udelader det helt som ønsket

                // Returner opgavedata, hvis brugeren er involveret
                if (
                  taskData.userId === userId ||
                  taskData.receiverId === userId
                ) {
                  resolve({
                    taskId,
                    title: taskData.title,
                    receiverId: taskData.receiverId, // Bruger receiverId
                    // Vi fjerner lastMessage her
                  });
                } else {
                  resolve(null);
                }
              });
            });
          });

          // Vent på alle opgaver og beskeder
          Promise.all(allTasks).then((resolvedTasks) => {
            setTasks(resolvedTasks.filter((task) => task !== null));
          });
        } else {
          setTasks([]);
        }
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [database, userId]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <main>
      <h1>Dine Beskeder</h1>
      <div>
        {tasks.map((task) => (
          <div key={task.taskId}>
            <Link to={`/tasks/${task.taskId}/chat`}>
              <h2>{task.title}</h2>
              <p>Chat med: {task.receiverId}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
