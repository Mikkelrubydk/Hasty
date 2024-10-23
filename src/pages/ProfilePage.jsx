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
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true); // Start loader
        const userRef = ref(database, "users/" + user.uid);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setName(userData.name || "");
            setProfileImage(userData.profileImage || "");
          } else {
            console.log("Ingen bruger data fundet!");
          }
        } catch (error) {
          console.error("Fejl ved hentning af brugerdata: ", error);
          setErrorMessage("Der opstod en fejl ved hentning af brugerdata.");
        } finally {
          setLoading(false); // Stop loader, uanset hvad der sker
        }
      };
      fetchUserData();
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

  return (
    <section className="profile-wrapper">
      <div className="profile-page">
        {loading ? ( // Hvis loading er true, vis spinner
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
            <button className="nextbtn btn2" type="submit">
              Gem Ændringer
            </button>
            <button className="nextbtn" type="button" onClick={handleLogout}>
              Log Ud
            </button>
          </form>
        )}
        <div className="profilopgaver">
          <article>
            <h2>13</h2>
            <span>Opgaver oprettet</span>
          </article>
          <article>
            <h2>2</h2>
            <span>Opgaver i gang</span>
          </article>
          <article>
            <h2>20</h2>
            <span>Udførte opgaver</span>
          </article>
        </div>
      </div>
    </section>
  );
}
