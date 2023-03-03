import { useState } from "react";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("this is working!!");
    // need to implement POST req here
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default AddTaskForm;
