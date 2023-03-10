import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/App.css";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, deadline, userId: user.id };

    fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("response", res);
        if (!res) {
          throw new Error("missing a field in the data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setTitle("");
        setDeadline("");
        setDescription("");
        setSuccess("Task has been added");
        setTimeout(() => setSuccess(""), 2000);
      });
  };

  return (
    <>
      <nav>
        <div className="watermark">List it out </div>
        <div className="sign-out-button">
          <Link to="/">Sign Out</Link>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className="add-task-form">
        <label>
          Title:
          <input
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Deadline:
          <input
            type="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <button type="submit">add task</button>
      </form>
      {success && <div className="success">{success}</div>}
      <div className="all-tasks-2">
        <Link to="/tasks" {...user}>
          all tasks
        </Link>
      </div>
      <div className="dashboard-button-2">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </>
  );
}

export default AddTaskForm;
