import { useState } from "react";

function ToDoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="Ne yapılması gerekiyor?"
        autoFocus
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
    </form>
  );
}

export default ToDoForm;
