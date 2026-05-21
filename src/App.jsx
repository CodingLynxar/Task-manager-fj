import { useState } from "react";
import "./styles.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <div className="overlay"></div>

      <div className="container">
        <div className="topSection">
          <h1>Task Manager</h1>
          <p>Plan your day. Stay productive.</p>
        </div>

        <div className="inputSection">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="stats">
          <div className="statCard">
            <h2>{tasks.length}</h2>
            <span>Total Tasks</span>
          </div>

          <div className="statCard">
            <h2>{tasks.filter((t) => t.completed).length}</h2>
            <span>Completed</span>
          </div>
        </div>

        <div className="taskContainer">
          {tasks.length === 0 ? (
            <div className="empty">
              No tasks added yet.
            </div>
          ) : (
            tasks.map((task) => (
              <div className="taskCard" key={task.id}>
                <div className="taskLeft">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <p className={task.completed ? "completed" : ""}>
                    {task.text}
                  </p>
                </div>

                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
