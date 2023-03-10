import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const apiUrl = "http://localhost:4000";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password, name };

    fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res) {
          throw new Error("missing a required field");
        }
        return res.json();
      })

      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.replace("/dashboard");
        }
      });
  };

  return (
    <>
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      <div className="signup-title">Signup</div>
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="name">
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="submit">
          Sign up
        </button>
      </form>
    </>
  );
}

export default Signup;
