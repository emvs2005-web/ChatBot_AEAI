import { PRIORITIES, TIMELINE_HOURS } from "../../constants";
import { timeToMinutes, formatDate } from "../../utils/helpers";

export default function Timeline({ tasks, toggleDone }) {
  const sortedTasks = [...tasks].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  return (
    <div
      style={{
        background: "#161616",
        borderRadius: "12px",
        border: "1px solid #222",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #222",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>Today's Timeline</span>
        <span style={{ color: "#555", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
          {formatDate()}
        </span>
      </div>

      {/* Timeline rows */}
      <div style={{ padding: "16px 20px" }}>
        {TIMELINE_HOURS.map((hour) => {
          const hourTasks = sortedTasks.filter(
            (t) => Math.floor(timeToMinutes(t.time) / 60) === hour
          );
          return (
            <div
              key={hour}
              style={{ display: "flex", gap: "12px", minHeight: "48px", marginBottom: "4px" }}
            >
              <div
                style={{
                  width: "44px",
                  color: "#444",
                  fontSize: "11px",
                  fontFamily: "'DM Mono', monospace",
                  paddingTop: "4px",
                  flexShrink: 0,
                }}
              >
                {String(hour).padStart(2, "0")}:00
              </div>
              <div
                style={{ flex: 1, borderLeft: "1px solid #222", paddingLeft: "12px", paddingBottom: "4px" }}
              >
                {hourTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleDone(task.id)}
                    style={{
                      background: task.done ? "#1a1a1a" : PRIORITIES[task.priority].bg + "22",
                      border: `1px solid ${task.done ? "#2a2a2a" : PRIORITIES[task.priority].color + "44"}`,
                      borderLeft: `3px solid ${task.done ? "#333" : PRIORITIES[task.priority].color}`,
                      borderRadius: "6px",
                      padding: "8px 10px",
                      marginBottom: "4px",
                      cursor: "pointer",
                      opacity: task.done ? 0.5 : 1,
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div
                        style={{
                          color: task.done ? "#555" : "#ddd",
                          fontSize: "13px",
                          fontWeight: "500",
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                      >
                        {task.title}
                      </div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span style={{ color: "#555", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
                          {task.time} · {task.duration}m
                        </span>
                        <span
                          style={{
                            background: PRIORITIES[task.priority].color + "22",
                            color: PRIORITIES[task.priority].color,
                            fontSize: "10px",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontWeight: "600",
                          }}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div style={{ color: "#555", fontSize: "11px", marginTop: "2px" }}>{task.category}</div>
                  </div>
                ))}
                {hourTasks.length === 0 && (
                  <div style={{ height: "1px", background: "#1a1a1a", marginTop: "8px" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
