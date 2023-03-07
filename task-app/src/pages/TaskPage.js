// Things to implement on this page:
// useEffect to use GET/tasks to load all of the users tasks
// PATCH task on each task aswell

import { useState, useEffect } from "react";
import "../style/App.css";
import { Link } from "react-router-dom";

function TaskPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = 10;
    // need to get user data in a dynamic way
    fetch(`${apiUrl}/tasks/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

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
    // const token = localStorage.getItem("token");
    fetch(`${apiUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "complete" }),
    })
      .then((res) => {
        console.log("this is the response", res);
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
      <h1>Task Page</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.deadline}</p>
            <div className="button-group">
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              {!task.completed && (
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
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default TaskPage;
