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

  // Hent opgave- og brugerdata ved komponentens montering
  useEffect(() => {
    const taskRef = ref(database, `tasks/${taskId}`);

    // Hent opgaveejerens data
    get(taskRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          setTaskOwnerId(taskData.userId);
          setTaskTitle(taskData.title);
          setTaskOwnerImage(taskData.profileImage || "/default-user.webp");
          return get(ref(database, `users/${taskData.userId}`));
        }
      })
      .then((userSnapshot) => {
        if (userSnapshot && userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setTaskOwnerName(userData.name);
          setTaskOwnerImage(userData.profileImage || "/default-user.webp");
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning af opgaveejerens data:", error);
      });

    // Hent nuværende brugers data
    get(ref(database, `users/${userId}`))
      .then((userSnapshot) => {
        if (userSnapshot && userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUserName(userData.name);
          setProfileImage(userData.profileImage || "/default-user.webp");
        }
      })
      .catch((error) => {
        console.error("Fejl ved hentning af brugerens data:", error);
      });
  }, [database, taskId, userId]);

  // Lyt til beskeder for den aktuelle chat
  useEffect(() => {
    const messagesRef = ref(database, `chats/${taskId}`);

    // Lyt til realtidsopdateringer af beskeder
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages = Object.values(snapshot.val());
        const filteredMessages = allMessages.filter(
          (msg) => msg.receiverId === userId || msg.senderId === userId
        );

        // Tilføj brugerbilleder og navne til beskederne
        const messagesWithImages = filteredMessages.map((msg) => ({
          ...msg,
          senderImage: msg.senderId === userId ? profileImage : null, // Sæt til null for nu
          senderName: msg.senderId === userId ? userName : null, // Sæt til null for nu
        }));

        // Hent brugeroplysninger for hver besked
        const usersToFetch = [
          ...new Set(filteredMessages.map((msg) => msg.senderId)),
        ];
        Promise.all(
          usersToFetch.map((id) => get(ref(database, `users/${id}`)))
        ).then((userSnapshots) => {
          userSnapshots.forEach((userSnapshot) => {
            if (userSnapshot.exists()) {
              const userData = userSnapshot.val();
              const userId = userSnapshot.key;
              messagesWithImages.forEach((msg) => {
                if (msg.senderId === userId) {
                  msg.senderImage =
                    userData.profileImage || "/default-user.webp";
                  msg.senderName = userData.name;
                }
              });
            }
          });
          setMessages(messagesWithImages);
        });
      } else {
        setMessages([]); // Sætter beskeder til en tom liste, hvis ingen findes
      }
    });

    // Ryd op ved unmount
    return () => {
      off(messagesRef);
      unsubscribe();
    };
  }, [
    database,
    taskId,
    userId,
    profileImage,
    userName,
    taskOwnerImage,
    taskOwnerName,
  ]);

  // Håndter afsendelse af besked
  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && taskOwnerId) {
      const messageRef = ref(database, `chats/${taskId}`);
      const newMessageObj = {
        senderId: userId,
        receiverId: taskOwnerId,
        message: newMessage,
        timestamp: Date.now(),
      };

      // Gem den nye besked i databasen
      push(messageRef, newMessageObj)
        .then(() => setNewMessage("")) // Nulstil inputfeltet
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
