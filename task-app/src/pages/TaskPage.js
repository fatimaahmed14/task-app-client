// Things to implement on this page:
// useEffect to use GET/tasks to load all of the users tasks
// DELETE task on ecah individual task
// PATCH task on each task aswell

import { useState, useEffect } from "react";
// import "./style/App.css";
import { Link } from "react-router-dom";

function TaskPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/tasks`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };

  const handleComplete = console.log("hey this works");

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
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}

export default TaskPage;