import { Link } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  return (
    <main className="start-page">
      <div className="start-img center">
        <img className="person" src="./img/man.png" alt="man" />
      </div>
      <div>
        <h1>Spend Smarter Save More</h1>

        <Link to="/login" className="btn-blue start-btn">
          Jetzt Starten
        </Link>

        <p>
          Du hast noch keinen Account?{" "}
          <Link to="/registrieren">Hier Registrieren!</Link>
        </p>
      </div>
    </main>
  );
};

export default StartPage;
