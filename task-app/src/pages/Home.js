import { Link } from "react-router-dom";
import "../style/App.css";

function Home() {
  return (
    <div className="home">
      <nav>
        <ul>
          <li className="login">
            <Link to="/login">Login</Link>
          </li>
          <li className="signup">
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h2 className="title">List it out.</h2>
        <h3 className="slogan">let it all out... *DIGITALLY*</h3>
      </main>
    </div>
  );
}

export default Home;
