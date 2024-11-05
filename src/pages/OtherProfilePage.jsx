// Dette komponent er programmeret af Anders og Mikkel

import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import placeholderImage from "/default-user.webp";
import turtleImage from "/turtle.png";
import elephantImage from "/elephant.png";
import catImage from "/cat.png";
import dogImage from "/dog.png";
import hareImage from "/hare.png";
import LoadingScreen from "../components/LoadingScreen";
import StarRating from "../components/StarRating";

export default function OtherProfilePage() {
  const { userId } = useParams();
  const auth = getAuth();
  const database = getDatabase();
  const navigate = useNavigate(); // Opret en instans af navigate

  // State-deklarationer
  const [profileImage, setProfileImage] = useState(placeholderImage);
  const [name, setName] = useState("Ukendt bruger");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [creationDate, setCreationDate] = useState("");
  const [profileDescription, setProfileDescription] = useState(
    "Denne bruger har ingen beskrivelse"
  );
  const [completedTasks, setCompletedTasks] = useState(0);
  const [rank, setRank] = useState("");
  const [rankImage, setRankImage] = useState("");
  const [rankDescriptionVisible, setRankDescriptionVisible] = useState(false);
  const [rankDescription, setRankDescription] = useState("");

  // Rangbilleder og beskrivelser
  const rankImages = {
    Skilpadde: turtleImage,
    Elefant: elephantImage,
    Kat: catImage,
    Hund: dogImage,
    Hare: hareImage,
  };

  const rankDescriptions = {
    Skilpadde:
      "Du er skilpadde rank, stadig begynder. Udfør flere opgaver for at stige i rank.",
    Elefant:
      "Du er på vej opad, nu elefant rank! Udfør flere opgaver for at stige i rank.",
    Kat: "Du er rank kat! Fortsæt med at udføre opgaver for at nå næste niveau.",
    Hund: "Du er rank hund, du er der næsten! Udfør flere opgaver for at komme i højeste rank.",
    Hare: "Tillykke, du er nu en ægte Hasty-Hare.",
  };

  // Hent brugerdata når userId ændres
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userRef = ref(database, `users/${userId}`);
      console.log("Henter brugerdata for userId:", userId);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Hentede brugerdata: ", userData);

          // Sæt state med hentede data
          setName(userData.name || "Ukendt bruger");
          setProfileImage(userData.profileImage || placeholderImage);
          setCreationDate(userData.creationDate || "");
          setCompletedTasks(userData.completedTasks || 0);
          setProfileDescription(
            userData.profileDescription || "Denne bruger har ingen beskrivelse"
          );

          console.log("Hentede brugeroplysninger:", {
            Name: userData.name,
            ProfileImage: userData.profileImage,
            CreationDate: userData.creationDate,
            CompletedTasks: userData.completedTasks,
            ProfileDescription: userData.profileDescription,
          });
        } else {
          console.log("Ingen brugerdata fundet!");
          setErrorMessage("Ingen brugerdata fundet!");
        }
      } catch (error) {
        console.error("Fejl ved hentning af brugerdata: ", error);
        setErrorMessage(
          "Der opstod en fejl ved hentning af brugerdata: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData(); // Kald funktionen for at hente brugerdata
    }
  }, [userId]);

  // Beregn rang baseret på udførte opgaver
  useEffect(() => {
    const calculateRank = (tasksCompleted) => {
      if (tasksCompleted <= 5) return "Skilpadde";
      if (tasksCompleted <= 10) return "Elefant";
      if (tasksCompleted <= 15) return "Kat";
      if (tasksCompleted <= 20) return "Hund";
      return "Hare"; // 21 og derover
    };

    const newRank = calculateRank(completedTasks);
    setRank(newRank);
    setRankImage(rankImages[newRank]);
    setRankDescription(rankDescriptions[newRank]);
  }, [completedTasks]);

  // Skift synlighed af rangbeskrivelse
  const toggleRankDescription = () => {
    setRankDescriptionVisible(!rankDescriptionVisible);
  };

  return (
    <section className="profile-wrapper">
      <div className="back-button" onClick={() => navigate(-1)}>
        {" "}
        {/* Opdateret her */}
        <img src="/tilbagepil.svg" alt="" className="back-button-image" />
      </div>
      <div className="profile-page">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="profileimage">
              <img
                src={profileImage}
                alt="Profilbillede"
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "-100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0px 2px 16.5px rgba(0, 0, 0, 0.25)",
                }}
              />
              <p>{name}</p>
            </div>

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
              <p>{profileDescription}</p>
            </div>
            <div className="profil-rang">
              <img
                src={rankImage}
                alt={rank}
                onClick={toggleRankDescription}
                style={{ cursor: "pointer" }}
              />
            </div>
            {rankDescriptionVisible && (
              <div className="rankcontainer">
                <p>Rank System</p>
                <div className="rankdescription">
                  {Object.keys(rankImages).map((key, index) => (
                    <div key={index} className={rank === key ? "active" : ""}>
                      <img src={rankImages[key]} alt={key} />
                    </div>
                  ))}
                </div>
                <div className="rank-beskrivelse">
                  <p>{rankDescription}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
