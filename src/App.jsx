import { useState } from 'react'

export default function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (!task.trim()) return

    setTasks([
      {
        id: Date.now(),
        text: task,
        completed: false
      },
      ...tasks
    ])

    setTask('')
  }

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h2>TaskFlow</h2>

        <div className="menu">
          <div className="menuItem active">Dashboard</div>
          <div className="menuItem">Tasks</div>
          <div className="menuItem">Progress</div>
        </div>
      </div>

      <div className="main">
        <div className="top">
          <h1>Task Manager</h1>
          <p>Organize your work smoothly.</p>
        </div>

        <div className="taskInput">
          <input
            type="text"
            placeholder="Write your task here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Tasks</h3>
            <span>{tasks.length}</span>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <span>{tasks.filter((t) => t.completed).length}</span>
          </div>
        </div>

        <div className="taskList">
          {tasks.length === 0 ? (
            <div className="empty">No tasks available.</div>
          ) : (
            tasks.map((task) => (
              <div className="taskCard" key={task.id}>
                <div className="taskLeft">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => completeTask(task.id)}
                  />

                  <p className={task.completed ? 'completed' : ''}>
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
  )
}
