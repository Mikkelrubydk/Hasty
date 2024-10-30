import { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, off, get } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";

export default function Chat({ userId }) {
  const { taskId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [taskOwnerId, setTaskOwnerId] = useState(null);
  const [taskOwnerName, setTaskOwnerName] = useState("Ukendt bruger");
  const [taskTitle, setTaskTitle] = useState("Opgave");
  const [taskOwnerImage, setTaskOwnerImage] = useState("/default-user.webp");
  const [profileImage, setProfileImage] = useState("/default-user.webp");
  const [userName, setUserName] = useState("Ukendt bruger");
  const database = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    const taskRef = ref(database, `tasks/${taskId}`);

    // Hent opgaveejerens ID, titel og billede
    get(taskRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          setTaskOwnerId(taskData.userId); // Sæt taskOwnerId
          setTaskTitle(taskData.title); // Sæt opgavetitel
          setTaskOwnerImage(taskData.profileImage || "/default-user.webp"); // Sæt opgaveejerens billede
          return get(ref(database, `users/${taskData.userId}`)); // Hent brugerdata
        }
      })
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setTaskOwnerName(userData.name); // Sæt opgaveejerens navn
          setTaskOwnerImage(userData.profileImage || "/default-user.webp"); // Sæt opgaveejerens billede
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning af opgaveejerens ID:", error);
      });

    // Hent brugerens oplysninger
    get(ref(database, `users/${userId}`))
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserName(userData.name); // Sæt brugerens navn
          setProfileImage(userData.profileImage || "/default-user.webp"); // Sæt brugerens billede
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning af brugerens data:", error);
      });
  }, [database, taskId, userId]);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${taskId}`);

    // Lyt efter realtidsopdateringer
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages = Object.values(snapshot.val());
        // Filtrer beskeder mellem userId og taskOwnerId
        const filteredMessages = allMessages.filter(
          (msg) =>
            (msg.senderId === userId && msg.receiverId === taskOwnerId) ||
            (msg.senderId === taskOwnerId && msg.receiverId === userId)
        );
        // Sæt beskederne og tilføj billeder
        const messagesWithImages = filteredMessages.map((msg) => ({
          ...msg,
          senderImage: msg.senderId === userId ? profileImage : taskOwnerImage,
          senderName: msg.senderId === userId ? userName : taskOwnerName,
        }));
        setMessages(messagesWithImages);
      } else {
        setMessages([]); // Hvis der ikke er nogen beskeder, sæt til en tom array
      }
    });

    // Ryd op efter lytteren ved unmount
    return () => {
      off(messagesRef); // Stopper lytteren, når komponenten unmountes
    };
  }, [
    database,
    taskId,
    userId,
    taskOwnerId,
    profileImage,
    taskOwnerImage,
    userName,
    taskOwnerName,
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && taskOwnerId) {
      const messageRef = ref(database, `chats/${taskId}`);
      const newMessageObj = {
        senderId: userId,
        receiverId: taskOwnerId,
        message: newMessage,
        timestamp: Date.now(),
      };

      push(messageRef, newMessageObj)
        .then(() => setNewMessage(""))
        .catch((error) =>
          console.error("Fejl ved afsendelse af besked:", error)
        );
    }
  };

  return (
    <main className="chat">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img
          src="/tilbagepil.svg"
          alt="Tilbage"
          className="back-button-image"
        />
      </div>
      <h1>{taskTitle}</h1>
      <h2>Du chatter med {taskOwnerName}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === userId ? "my-message" : "their-message"}
          >
            <img
              src={msg.senderImage}
              alt="Brugerbillede"
              className="message-user-image"
            />
            <p>{msg.senderName}</p>
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
        />
        <button onClick={handleSendMessage}>
          <img src="/message.webp" alt="Send ikon" />
        </button>
      </div>
    </main>
  );
}
