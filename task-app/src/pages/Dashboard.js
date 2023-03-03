import { useState, useEffect } from "react";
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
      <div>add a task +</div>
    </div>
  );
}

export default Dashboard;
