import React, { useState } from "react";
import Loader from "../components/LoadingScreen";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="login-container">
      <Loader />
      <figure>
        <img src="/Logo.svg" alt="" />
      </figure>

      <div className="login-page">
        <div className="form">
          {isLogin ? (
            <form className="login-form">
              <input type="text" placeholder="brugernavn" />
              <input type="password" placeholder="kodeord" />
              <Link to="/hjem">
                <button>login</button>
              </Link>
              <p className="message">
                Ikke registreret?{" "}
                <a href="#" onClick={toggleForm}>
                  Opret en bruger
                </a>
              </p>
            </form>
          ) : (
            <form className="register-form">
              <input type="text" placeholder="navn" />
              <input type="password" placeholder="kodeord" />
              <input type="text" placeholder="email" />
              <button>Opret</button>
              <p className="message">
                Allerede oprettet?{" "}
                <a href="#" onClick={toggleForm}>
                  Login
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
