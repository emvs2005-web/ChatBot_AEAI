import { CATEGORIES } from "../../constants";

const inputStyle = {
  background: "#0f0f0f",
  border: "1px solid #333",
  borderRadius: "6px",
  padding: "10px 12px",
  color: "#fff",
  fontSize: "13px",
  outline: "none",
};

export default function AddTaskForm({ newTask, setNewTask, addTask }) {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "12px",
        border: "1px solid #333",
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      {/* Row 1 */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px", gap: "12px", marginBottom: "12px" }}
      >
        <input
          value={newTask.title}
          onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))}
          placeholder="Task title..."
          style={inputStyle}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask((p) => ({ ...p, time: e.target.value }))}
          style={inputStyle}
        />
        <input
          type="number"
          value={newTask.duration}
          onChange={(e) => setNewTask((p) => ({ ...p, duration: Number(e.target.value) }))}
          placeholder="Mins"
          style={inputStyle}
        />
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: "12px" }}>
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask((p) => ({ ...p, priority: e.target.value }))}
          style={inputStyle}
        >
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>
        <select
          value={newTask.category}
          onChange={(e) => setNewTask((p) => ({ ...p, category: e.target.value }))}
          style={inputStyle}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={addTask}
          style={{
            background: "#EF9F27",
            border: "none",
            borderRadius: "6px",
            color: "#000",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
