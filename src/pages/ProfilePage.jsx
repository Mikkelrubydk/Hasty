import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import placeholderImage from "/default-user.webp";
import LoadingScreen from "../components/LoadingScreen";

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
  const [completedTasks, setCompletedTasks] = useState(12);
  const [rank, setRank] = useState("");

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
            setCompletedTasks(userData.completedTasks || 15);
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
          const newCreationDate = new Date().toLocaleDateString("da-DK", options);
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
        completedTasks: completedTasks,
      });
      setSuccessMessage("Profil opdateret!");
      setErrorMessage("");
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
    document.getElementById("file-input").click(); // Simuler klik på filinput
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
    setProfileImage(rankImages[newRank]); // Opdater profilbillede baseret på rang
  }, [completedTasks]);

  return (
    <section className="profile-wrapper">
      <div className="profile-page">
        {loading ? (
          <LoadingScreen />
        ) : (
          <form onSubmit={handleUpdateProfile}>
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
            <button className="nextbtn" type="button" onClick={handleLogout}>
              Log Ud
            </button>
          </form>
        )}
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
        <div className="profil-rang">
          <h2>Rang: {rank}</h2>
          <img src={rankImages[rank]} alt={rank} style={{ width: "50px", height: "50px" }} />
        </div>
      </div>
    </section>
  );
}
