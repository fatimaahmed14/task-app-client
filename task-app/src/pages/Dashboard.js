import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) {
    return <div className="loading"></div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <Link to={{ pathname: "/newTask", user: user.id }}>add a task +</Link>
      <div>
        <Link to="/tasks">all tasks</Link>
      </div>
      <p>
        <Link to="/">Sign Out</Link>
      </p>
    </div>
  );
}

export default Dashboard;
