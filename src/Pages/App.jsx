import { useState, useCallback } from "react";
import ToDoForm from "../components/ToDoForm.jsx";
import ToDoList from "../components/ToDoList.jsx";

const initialTodos = [
  { id: 1, task: "Eğitimini Tamamla!", completed: true },
  {
    id: 2,
    task: "Yapılacak maddeyi -Enter- ile listeye ekleyebilirsin!",
    completed: false,
  },
  {
    id: 3,
    task: "Üzerine çift tıklayarak düzenleyebilirsin!",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  const addTodo = useCallback((task) => {
    const newTodo = {
      id: Date.now(),
      task: task,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id, newTask) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo,
      ),
    );
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>ToDoAPP</h1>
        <ToDoForm addTodo={addTodo} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ToDoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodoCount}</strong> Yapılacak Kaldı
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                Hepsi
              </a>
            </li>
            <li>
              <a href="#/">Aktif</a>
            </li>
            <li>
              <a href="#/">Tamamlanan</a>
            </li>
          </ul>

          <button className="clear-completed">Tamamlananları Kaldır</button>
        </footer>
      )}
    </section>
  );
}

export default App;
