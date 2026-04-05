import { PRIORITIES, CATEGORIES } from "../../constants";
import { timeToMinutes } from "../../utils/helpers";

export default function SidePanel({ tasks, setActiveTab }) {
  const sortedByTime = [...tasks].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  const highPriorityPending = tasks.filter((t) => t.priority === "high" && !t.done);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* High Priority Panel */}
      <div
        style={{
          background: "#161616",
          borderRadius: "12px",
          border: "1px solid #222",
          padding: "16px",
        }}
      >
        <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px", marginBottom: "12px" }}>
          🔥 High Priority
        </div>
        {highPriorityPending.slice(0, 4).map((task) => (
          <div
            key={task.id}
            style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#E24B4A",
                marginTop: "5px",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ color: "#ccc", fontSize: "12px" }}>{task.title}</div>
              <div style={{ color: "#555", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
                {task.time}
              </div>
            </div>
          </div>
        ))}
        {highPriorityPending.length === 0 && (
          <div style={{ color: "#5DCAA5", fontSize: "12px" }}>✓ All high priority tasks done!</div>
        )}
      </div>

      {/* Category Progress Panel */}
      <div
        style={{
          background: "#161616",
          borderRadius: "12px",
          border: "1px solid #222",
          padding: "16px",
        }}
      >
        <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px", marginBottom: "12px" }}>
          📊 Categories
        </div>
        {CATEGORIES.map((cat) => {
          const count = tasks.filter((t) => t.category === cat).length;
          if (!count) return null;
          const done = tasks.filter((t) => t.category === cat && t.done).length;
          return (
            <div key={cat} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#aaa", fontSize: "12px" }}>{cat}</span>
                <span style={{ color: "#555", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
                  {done}/{count}
                </span>
              </div>
              <div style={{ height: "3px", background: "#2a2a2a", borderRadius: "2px" }}>
                <div
                  style={{
                    width: `${(done / count) * 100}%`,
                    height: "100%",
                    background: "#EF9F27",
                    borderRadius: "2px",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setActiveTab("chat")}
        style={{
          background: "linear-gradient(135deg,#EF9F27,#E24B4A)",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          padding: "12px",
          fontWeight: "600",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        🤖 Ask AI to Optimize Schedule
      </button>
    </div>
  );
}
