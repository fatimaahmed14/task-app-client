import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTaskForm from "./pages/AddTaskForm";
import TaskPage from "./pages/TaskPage";

function App() {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/newTask" element={<AddTaskForm />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
