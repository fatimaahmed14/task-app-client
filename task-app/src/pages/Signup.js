import { useState } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <h2>Signup</h2>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;
