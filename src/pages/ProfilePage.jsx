import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import placeholderImage from "/default-user.webp";
import turtleImage from "/turtle.png"; // Billede for Skilpadde
import elephantImage from "/elephant.png"; // Billede for Elefant
import catImage from "/cat.png"; // Billede for Kat
import dogImage from "/dog.png"; // Billede for Hund
import hareImage from "/hare.png"; // Billede for Hare
import LoadingScreen from "../components/LoadingScreen";
import StarRating from "../components/StarRating";

export default function ProfilePage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const database = getDatabase();

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [creationDate, setCreationDate] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [completedTasks, setCompletedTasks] = useState(12);
  const [rank, setRank] = useState("");
  const [RankImage, setRankImage] = useState("");

  const rankImages = {
    Skilpadde: turtleImage,
    Elefant: elephantImage,
    Kat: catImage,
    Hund: dogImage,
    Hare: hareImage,
  };

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        const userRef = ref(database, "users/" + user.uid);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setName(userData.name || "");
            setProfileImage(userData.profileImage || "");
            setCreationDate(userData.creationDate || "");
            setProfileDescription(userData.profileDescription || "");
            setCompletedTasks(userData.completedTasks || 5);
          } else {
            console.log("Ingen bruger data fundet!");
          }
        } catch (error) {
          console.error("Fejl ved hentning af brugerdata: ", error);
          setErrorMessage("Der opstod en fejl ved hentning af brugerdata.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, database]);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, "users/" + user.uid);
      const checkAndSetCreationDate = async () => {
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (!userData || !userData.creationDate) {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const newCreationDate = new Date().toLocaleDateString(
            "da-DK",
            options
          );
          await set(userRef, {
            ...userData,
            creationDate: newCreationDate,
          });
          setCreationDate(newCreationDate);
        }
      };

      checkAndSetCreationDate();
    }
  }, [user, database]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (name === "") {
      setErrorMessage("Alle felter skal udfyldes");
      return;
    }

    try {
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, {
        name: name,
        profileImage: profileImage,
        creationDate: creationDate,
        profileDescription: profileDescription,
        completedTasks: completedTasks,
      });
      setSuccessMessage("Profil opdateret!");
      setErrorMessage("");
      setIsEditing(false); // Set to view mode after update

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Fejl ved opdatering af profil: ", error);
      setErrorMessage("Kunne ikke opdatere profil: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Bruger logget ud!");
      })
      .catch((error) => {
        console.error("Fejl ved logout: ", error);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Enable editing mode
  };

  useEffect(() => {
    const calculateRank = (tasksCompleted) => {
      if (tasksCompleted <= 5) return "Skilpadde";
      if (tasksCompleted <= 10) return "Elefant";
      if (tasksCompleted <= 15) return "Kat";
      if (tasksCompleted <= 20) return "Hund";
      return "Hare"; // 21 og over
    };

    const newRank = calculateRank(completedTasks);
    setRank(newRank);
    setRankImage(rankImages[newRank]); // Opdater rank-billede baseret på rang
  }, [completedTasks]);
}
  return (
    <section className="profile-wrapper">
      <div className="profile-page">
        {loading ? (
          <LoadingScreen />
        ) : (
          <form onSubmit={handleUpdateProfile} className="profilelementer">
            <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
              <img
                src={profileImage || placeholderImage}
                alt="Profilbillede"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  marginTop: "-100px",
                  objectFit: "cover",
                  boxShadow: "0px 2px 16.5px rgba(0, 0, 0, 0.25)",
                }}
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Navn"
              style={{
                background: isEditing
                  ? "rgba(255, 255, 255, 0.5)"
                  : "transparent",
                border: isEditing ? "1px solid #ccc" : "none",
              }}
              disabled={!isEditing} // Disable when not editing
            />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Skjul filinput
            />
            <p className="text-error">{errorMessage}</p>
            <p className="text-success">{successMessage}</p>
            <button
              className="nextbtn btn2"
              type="button"
              onClick={isEditing ? handleUpdateProfile : handleEditProfile}
            >
              {isEditing ? "Gem Ændringer" : "Rediger Profil"}
            </button>
            <button className="nextbtn" type="button" onClick={handleLogout}>
              Log Ud
            </button>
          </form>
        )}
        <StarRating rating={4} reviews={34} />
        <div className="oprettelsesdato">
          <h2>Medlem siden: {creationDate}</h2>
        </div>
        <div className="profilopgaver">
          <article>
            <h2>13</h2>
            <span>Opgaver oprettet</span>
          </article>
          <article>
            <h2>2</h2>
            <span>Igangværende opgaver</span>
          </article>
          <article>
            <h2>{completedTasks}</h2>
            <span>Udførte opgaver</span>
          </article>
        </div>
        <div className="profiledescription">
          <textarea
            type="text"
            id="description"
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
            name="description"
            placeholder="Tilføj en kort tekst om dig selv og dine kompetencer"
            style={{
              background: isEditing
                ? "rgba(255, 255, 255, 0.5)"
                : "transparent",
            }}
            disabled={!isEditing} // Disable when not editing
          ></textarea>
        <div className="profil-rang">
          <h2>Rang: {rank}</h2>
          <img src={rankImages[rank]} alt={rank} style={{ width: "50px", height: "50px" }} />
        </div>
      </div>
    </section>

