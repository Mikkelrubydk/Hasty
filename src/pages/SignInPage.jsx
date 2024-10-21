import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from input field in sign-in form
    const password = event.target.password.value; // password value from input field in sign-in form

    // Firebase sign in with email and password
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user); // For test purposes: logging the authenticated user
      })
      .catch((error) => {
        let code = error.code; // Error code from Firebase
        console.log(code);
        // Replace error code format for better readability
        code = code.replace(/-/g, " ").replace("auth/", "");
        switch (code) {
          case "invalid credential":
            setErrorMessage("Forkert adgangskode");
            break;
          case "too many attempts":
            setErrorMessage("For mange forsøg");
            break;
        } // Display user-friendly error message
      });
  }

  return (
    <section className="login-form">
      <form onSubmit={signIn}>
        <img src="/Logo.svg" className="logo" alt="Hasty Logo" />
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
