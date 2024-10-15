import { Link } from "react-router-dom";
import TaskDescription from "./TaskDescription";

export default function HomePage({ setActiveClass }) {
  return (
    <section className="homepage-container">
      <div>
        <figure>
          <img src="/Logo.svg" alt="Hasty logo" className="logo" />
          <img
            src="/notifikation.svg"
            alt="Notification icon"
            className="notification"
          />
        </figure>
        <article>
          <h1>få opgaver løst hurtigt, eller tilbyd din hjælp på ingen tid!</h1>
        </article>
      </div>
      <div className="category-container">
        <div className="category-text">
          <h2>Kategorier</h2>
          <Link
            to="/klaropgave"
            className="textlink"
            onClick={() => setActiveClass(2)} // Sæt aktiv klasse til 2, når linket klikkes
          >
            <span>Vis alle</span>
          </Link>
        </div>
        <div className="category-wrapper">
          <figure>
            <div className="shadow">
              <img src="/hammer.webp" alt="Hammer icon" />
            </div>
            <figcaption>Håndværker</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/spanner.webp" alt="VVS icon" />
            </div>
            <figcaption>VVS</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/pruning-shears.webp" alt="Havearbejde icon" />
            </div>
            <figcaption>Havearbejde</figcaption>
          </figure>
          <figure>
            <div className="shadow">
              <img src="/box.webp" alt="Flyning icon" />
            </div>
            <figcaption>Flytning</figcaption>
          </figure>
        </div>
      </div>

      <div className="task-container">
        <div className="task-text">
          <h2>Nyligt oprettede opgaver</h2>
          <Link
            to="/opretopgave"
            className="textlink"
            onClick={() => setActiveClass(1)} // Sæt aktiv klasse til 2, når linket klikkes
          >
            <span>Vis alle</span>
          </Link>
        </div>
        <div className="task-wrapper">
          <section>
            <figure>
              <img src="/brokensink.webp" alt="Ødelagt Håndvask" />
            </figure>
            <article>
              <div>
                <h3>Ødelagt håndvask</h3>
                <span>VVS</span>
              </div>
              <div>
                <span className="pris">500KR</span>
              </div>
            </article>
          </section>

          <section>
            <figure>
              <img src="/fladcykel.webp" alt="Punkteret cykeldæk" />
            </figure>
            <article>
              <div>
                <h3>Punkteret cykel</h3>
                <span>Cykel</span>
              </div>
              <div>
                <span className="pris">200KR</span>
              </div>
            </article>
          </section>

          <section>
            <figure>
              <img src="/brokensink.webp" alt="Ødelagt Håndvask" />
            </figure>
            <article>
              <div>
                <h3>Ødelagt håndvask</h3>
                <span>VVS</span>
              </div>
              <div>
                <span className="pris">500KR</span>
              </div>
            </article>
          </section>
        </div>
      </div>
    </section>
  );
}
