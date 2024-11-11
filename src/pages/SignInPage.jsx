// Dette komponent er programmeret af Mikkel

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail-værdi fra inputfeltet i login-formularen
    const password = event.target.password.value; // adgangskode-værdi fra inputfeltet i login-formularen

    // Firebase login med e-mail og adgangskode
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Logget ind
        const user = userCredential.user;
        console.log(user); // For testformål: logger den autentificerede bruger
      })
      .catch((error) => {
        let code = error.code; // Fejlkode fra Firebase
        console.log(code);
        // Erstat fejlkodeformatet for bedre læsbarhed
        code = code.replace(/-/g, " ").replace("auth/", "");
        switch (code) {
          case "invalid credential":
            setErrorMessage("Forkert adgangskode");
            break;
          case "too many attempts":
            setErrorMessage("For mange forsøg");
            break;
        } // Vis brugervenlig fejloplysning
      });
  }

  return (
    <section className="login-form">
      <form onSubmit={signIn}>
        <img src="logo.svg" className="logo" alt="Hasty Logo" />
        <input type="email" name="mail" placeholder="Mail" required />
        <input type="password" name="password" placeholder="Kodeord" required />
        <p className="text-error">{errorMessage}</p>
        <button type="submit">Login</button>
        <p className="text-center">
          Er du ikke medlem endnu?{" "}
          <Link className="text-link" to="/sign-up">
            Opret konto
          </Link>
        </p>
      </form>
    </section>
  );
}
