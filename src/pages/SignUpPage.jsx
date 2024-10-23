import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();

    if (name === "" || mail === "" || password === "") {
      setErrorMessage("Alle felter skal udfyldes");
      return;
    }

    // Firebase sign-up logic
    createUserWithEmailAndPassword(auth, mail, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Update Firebase profile with name
        try {
          await updateProfile(user, { displayName: name });
          console.log("User profile updated with name");
        } catch (updateError) {
          console.error("Error updating profile: ", updateError);
          setErrorMessage("Kunne ikke opdatere profil");
        }

        await createUser(user.uid, mail);
      })
      .catch((error) => {
        let code = error.code.replace(/-/g, " ").replace("auth/", "");
        console.log(code);

        switch (code) {
          case "email already in use":
            setErrorMessage("Email allerede i brug");
            break;
          default:
            setErrorMessage(code);
            break;
        }
      });
  }

  async function createUser(uid, mail) {
    const url = `https://hasty-f0e75-default-rtdb.firebaseio.com/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, mail }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <section className="login-form">
      <form onSubmit={handleSignUp}>
        <img src="/Logo.svg" className="logo" alt="Hasty Logo" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Navn"
        />
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Kodeord"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Opret Konto</button>
        <p className="text-center">
          Er du allerede oprettet?{" "}
          <Link className="text-link" to="/sign-in">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
