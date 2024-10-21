import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from input field
    const password = event.target.password.value; // password value from input field

    if (name === "" || mail === "" || password === "") {
      setErrorMessage("Alle felter skal udfyldes");
      return;
    }

    // Firebase sign-up logic
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Update Firebase profile with name
        updateProfile(user, { displayName: name }).then(() => {
          console.log("User profile updated with name");
        });

        createUser(user.uid, mail);
      })
      .catch((error) => {
        let code = error.code; // Save error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // String formatting for better readability
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);

        switch (code) {
          case "email already in use":
            setErrorMessage("email allerede i brug");
            break;
        }
      });
  }

  async function createUser(uid, mail) {
    const url = `https://hasty-f0e75-default-rtdb.firebaseio.com/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, mail }),
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
          name="name"
          placeholder="Navn"
        />
        <input type="email" name="mail" placeholder="Mail" />
        <input type="password" name="password" placeholder="Kodeord" />
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
