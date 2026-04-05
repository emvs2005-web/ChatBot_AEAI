import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { timeToMinutes } from "../../utils/helpers";

export default function TasksTab({
  tasks,
  toggleDone,
  deleteTask,
  showAddTask,
  setShowAddTask,
  newTask,
  setNewTask,
  addTask,
}) {
  const sortedTasks = [...tasks].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: 0 }}>All Tasks</h2>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          style={{
            background: "#EF9F27",
            border: "none",
            borderRadius: "8px",
            color: "#000",
            padding: "8px 16px",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {showAddTask ? "✕ Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* Add form */}
      {showAddTask && (
        <AddTaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
