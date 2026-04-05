import { PRIORITIES } from "../../constants";

export default function TaskItem({ task, toggleDone, deleteTask }) {
  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "10px",
        border: `1px solid ${task.done ? "#222" : "#2a2a2a"}`,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        opacity: task.done ? 0.6 : 1,
        transition: "all 0.2s",
      }}
    >
      {/* Checkbox */}
      <div
        onClick={() => toggleDone(task.id)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${task.done ? "#5DCAA5" : PRIORITIES[task.priority].color}`,
          background: task.done ? "#5DCAA5" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {task.done && <span style={{ color: "#000", fontSize: "11px", fontWeight: "800" }}>✓</span>}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: task.done ? "#555" : "#ddd",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: task.done ? "line-through" : "none",
          }}
        >
          {task.title}
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
          <span style={{ color: "#555", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
            ⏰ {task.time}
          </span>
          <span style={{ color: "#555", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
            ⏱ {task.duration}m
          </span>
          <span style={{ color: "#555", fontSize: "12px" }}>📁 {task.category}</span>
        </div>
      </div>

      {/* Priority badge */}
      <span
        style={{
          background: PRIORITIES[task.priority].color + "22",
          color: PRIORITIES[task.priority].color,
          fontSize: "11px",
          padding: "3px 8px",
          borderRadius: "4px",
          fontWeight: "600",
          flexShrink: 0,
        }}
      >
        {PRIORITIES[task.priority].label}
      </span>

      {/* Delete */}
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "#444",
          cursor: "pointer",
          fontSize: "16px",
          padding: "4px",
          borderRadius: "4px",
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
