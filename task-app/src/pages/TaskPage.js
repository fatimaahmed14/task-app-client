import { useState, useEffect } from "react";
import "../style/App.css";
import { Link } from "react-router-dom";

function TaskPage() {
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
        console.log(user);
        if (data.id) {
          fetch(`${apiUrl}/tasks/${data.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => setTasks(data));
        }
      });
  }, [tasks, user]);

  const handleDelete = (id) => {
    // const token = localStorage.getItem("token");
    fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
      // headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };

  const handleComplete = (id) => {
    fetch(`${apiUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "complete" }),
    })
      .then((res) => {
        if (!res) {
          throw new Error("Failed to update task");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="task-container">
      <nav>
        <div className="watermark">List it out </div>
        <div className="sign-out-button">
          <Link to="/">Sign Out</Link>
        </div>
      </nav>
      <h1 className="task-page-title">My Tasks</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.status === "complete" ? "complete" : ""}`}
          >
            <h3 className="task-title-box">{task.title}</h3>
            <p className="task-description-box">{task.description}</p>
            <p className="task-deadline-box">{task.deadline}</p>
            <div className="button-group">
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              {task.status !== "complete" && (
                <button
                  className="complete-button"
                  onClick={() => handleComplete(task.id)}
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-button">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
      <div className="add-task-button-2">
        <Link to="/addTask">add a new task </Link>
      </div>
    </div>
  );
}

export default TaskPage;
