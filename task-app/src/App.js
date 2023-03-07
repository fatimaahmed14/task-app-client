import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTaskForm from "./pages/AddTaskForm";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newTask" element={<AddTaskForm />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
