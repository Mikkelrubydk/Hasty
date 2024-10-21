import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // Add a placeholder image or null
  const imgPlaceholder = "path/to/placeholder.png"; // Define your placeholder image path
  const auth = getAuth();
  const url = `https://hasty-f0e75-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;

  useEffect(() => {
    if (!auth.currentUser) return; // Ensure auth.currentUser exists before fetching

    async function getUser() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log(userData);
        if (userData) {
          setName(userData.name);
          setEmail(auth.currentUser.email); // Use auth for email
          setTitle(userData.title || "");
          setImage(userData.image || imgPlaceholder);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    getUser();
  }, [auth.currentUser, url]);

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = { name, mail: email, title, image };
    console.log(userToUpdate);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
          "Content-Type": "application/json", // Ensure proper headers for JSON
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User updated: ", data);
      } else {
        console.log("Sorry, something went wrong");
      }
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }

  return (
    <section className="page">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <button type="submit" className="btn-outline">
          Update Profile
        </button>
        <button className="btn-outline" onClick={handleSignOut}>
          Sign Out
        </button>
      </form>
    </section>
  );
}
