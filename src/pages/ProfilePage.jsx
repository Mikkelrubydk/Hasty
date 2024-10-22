import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage functions

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // For displaying uploaded image
  const [imageFile, setImageFile] = useState(null); // Store the uploaded image file
  const [imagePreview, setImagePreview] = useState(null); // For showing the image preview
  const imgPlaceholder = "/default-user.webp"; // Placeholder image path
  const auth = getAuth();
  const storage = getStorage(); // Firebase storage reference
  const url = `https://hasty-f0e75-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("No user is authenticated.");
      return;
    }

    async function getUser() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log("Fetched user data: ", userData);
        if (userData) {
          setName(userData.name || "");
          setEmail(auth.currentUser.email); // Get email from auth
          setTitle(userData.title || "");
          setImage(userData.image || imgPlaceholder); // Set the image (existing or placeholder)
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    getUser();
  }, [auth.currentUser, url]);

  async function handleImageUpload() {
    if (imageFile) {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      try {
        const snapshot = await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL; // Return image download URL after upload
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Current user ID: ", auth.currentUser?.uid);

    const imageUrl = await handleImageUpload(); // Upload image and get the URL

    const userToUpdate = {
      name,
      mail: email,
      title,
      image: imageUrl || image, // Update image if a new one was uploaded
    };

    console.log("Data to update: ", userToUpdate);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated: ", data);
        setImage(imageUrl || image); // Update the image on the page after the update
      } else {
        const errorData = await response.json();
        console.log("Failed to update user: ", errorData);
      }
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL); // Update the image preview URL
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
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit" className="btn-outline">
          Update Profile
        </button>
        <button className="btn-outline" onClick={handleSignOut}>
          Sign Out
        </button>
      </form>

      <div className="profile-image-container">
        <img
          src={imagePreview || image || imgPlaceholder}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>
    </section>
  );
}
