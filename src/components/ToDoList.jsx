import { useState } from "react";

function ToDoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.task);
  };

  const handleUpdate = (id) => {
    updateTodo(id, editText);
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`${todo.completed ? "completed" : ""} ${editingId === todo.id ? "editing" : ""}`}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {/* Çift tıklama ile düzenleme moduna geçer */}
            <label onDoubleClick={() => handleEdit(todo)}>{todo.task}</label>
            <button
              className="destroy"
              onClick={() => deleteTodo(todo.id)}
            ></button>
          </div>

          {/* Düzenleme sırasında görünecek input alanı */}
          {editingId === todo.id && (
            <input
              className="edit"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleUpdate(todo.id)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate(todo.id)}
              autoFocus
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
