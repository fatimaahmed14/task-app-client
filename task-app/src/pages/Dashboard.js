import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
// use react's library for pie charts
import "../style/App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.id) {
          fetch(`${apiUrl}/tasks/${data.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        }
      });
  }, []);

  if (!user) {
    return <div className="loading"></div>;
  }

  const incompleteTasks = tasks.filter((task) => task.status === "incomplete");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const data = [
    {
      title: "Incomplete Tasks",
      value: incompleteTasks.length,
      color: "#FF5733",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.length,
      color: "#3CB371",
    },
  ];

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div className="progress-pie-chart">
        <PieChart data={data} />
      </div>
      <Link to="/addTask">add a task +</Link>
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
