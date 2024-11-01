import { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, get } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function Chat({ userId }) {
  const { taskId, taskOwnerId } = useParams(); // Hent taskId og taskOwnerId fra URL'en
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [taskOwnerName, setTaskOwnerName] = useState("Ukendt bruger");
  const [taskTitle, setTaskTitle] = useState("Opgave");
  const [profileImage, setProfileImage] = useState("/default-user.webp");
  const [userName, setUserName] = useState("Ukendt bruger");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const database = getDatabase();
  const navigate = useNavigate();

  // Fetch task and user data
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const taskRef = ref(database, `tasks/${taskId}`);
        const taskSnapshot = await get(taskRef);

        if (taskSnapshot.exists()) {
          const taskData = taskSnapshot.val();
          setTaskTitle(taskData.title);

          // Fetch user data of task owner
          const userSnapshot = await get(
            ref(database, `users/${taskData.userId}`)
          );
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            setTaskOwnerName(userData.name);
          } else {
            setError("Opgaveejer findes ikke.");
          }
        } else {
          setError("Opgaven findes ikke.");
        }
      } catch (error) {
        setError("Fejl ved hentning af opgave data.");
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      if (!userId) {
        setError("Brugeren findes ikke.");
        setLoading(false);
        return;
      }

      try {
        const userSnapshot = await get(ref(database, `users/${userId}`));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserName(userData.name);
          setProfileImage(userData.profileImage || "/default-user.webp");
        } else {
          setError("Brugeren findes ikke.");
        }
      } catch (error) {
        setError("Fejl ved hentning af brugerens data.");
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading is set to false after attempts to fetch user data
      }
    };

    fetchTaskData();
    fetchUserData();
  }, [database, taskId, userId]);

  // Listen to messages
  useEffect(() => {
    if (userId && taskOwnerId) {
      const chatId = `${taskId}_${taskOwnerId}_${userId}`; // Generer chat ID baseret på taskId og taskOwnerId
      const messagesRef = ref(database, `chats/${chatId}`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const allMessages = Object.values(snapshot.val());
          const filteredMessages = allMessages.filter(
            (msg) => msg.senderId === userId || msg.receiverId === userId
          );
          setMessages(filteredMessages); // Opdaterer med beskeder fra den rigtige chat
        } else {
          setMessages([]); // Ingen beskeder
        }
      });

      return () => unsubscribe(); // Ryd op ved komponent unmount
    }
  }, [database, userId, taskOwnerId, taskId]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && taskOwnerId && userId) {
      const chatId = `${taskId}_${taskOwnerId}_${userId}`; // Generer chat ID baseret på taskId og taskOwnerId
      const messageRef = ref(database, `chats/${chatId}`);
      const newMessageObj = {
        senderId: userId,
        receiverId: taskOwnerId,
        message: newMessage,
        timestamp: Date.now(),
      };

      try {
        await push(messageRef, newMessageObj); // Send besked til den rigtige chat
        setNewMessage(""); // Reset inputfelt
      } catch (error) {
        setError("Fejl ved afsendelse af besked.");
        console.error(error);
      }
    } else {
      console.warn(
        "Besked kan ikke være tom eller brugeren kan ikke være ukendt!"
      );
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="chat">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img
          src="/tilbagepil.svg"
          alt="Tilbage"
          className="back-button-image"
        />
      </div>

      <div className="taskinfo">
        <h1>{taskTitle}</h1>
        <h2>Du chatter med {taskOwnerName}</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={`${msg.timestamp}_${msg.senderId}`}
            className={msg.senderId === userId ? "my-message" : "their-message"}
          >
            <img
              src={
                msg.senderId === userId ? profileImage : "/default-user.webp"
              }
              alt="Brugerbillede"
              className="message-user-image"
              onError={(e) => (e.target.src = "/default-user.webp")}
            />
            <p>{msg.senderId === userId ? userName : taskOwnerName}</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Skriv en besked..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(); // Kalder sendebesked-funktionen, når Enter trykkes
            }
          }}
        />
        <button onClick={handleSendMessage}>
          <img src="/message.webp" alt="Send ikon" />
        </button>
      </div>
    </main>
  );
}
