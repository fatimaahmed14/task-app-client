import { useState, useEffect } from "react";
import "../style/App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    // need to create getUser route in server
    // Retrieve the user's account information from the server using the stored token W/auth
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) {
    return <div className="loading"></div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
}

export default Dashboard;
