import { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, off } from "firebase/database";
import { useParams } from "react-router-dom";

export default function Chat({ userId }) {
  const { taskId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const database = getDatabase();

  useEffect(() => {
    const messagesRef = ref(database, `chats/${taskId}`);

    // Lyt efter opdateringer i realtid
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        setMessages(Object.values(snapshot.val()));
      } else {
        setMessages([]); // Hvis der ikke er beskeder, sæt tom array
      }
    });

    // Fjern lytter, når komponenten unmountes
    return () => {
      off(messagesRef); // Stopper lytteren, når komponenten unmountes
    };
  }, [database, taskId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageRef = ref(database, `chats/${taskId}`);
      const newMessageObj = {
        senderId: userId,
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
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === userId ? "my-message" : "their-message"}
          >
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </main>
  );
}
