import { calcStats } from "../../utils/helpers";

export default function StatsBar({ tasks }) {
  const { done, total, highPriority, totalMins, progressPct } = calcStats(tasks);

  const stats = [
    { label: "Completed", value: `${done}/${total}`, color: "#5DCAA5" },
    { label: "High Priority", value: highPriority, color: "#E24B4A" },
    { label: "Total Time", value: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`, color: "#EF9F27" },
    { label: "Progress", value: `${progressPct}%`, color: "#7F77DD" },
  ];

  return (
    <div
      style={{
        background: "#161616",
        borderBottom: "1px solid #222",
        padding: "12px 24px",
        display: "flex",
        gap: "24px",
        alignItems: "center",
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#555", fontSize: "12px" }}>{s.label}</span>
          <span
            style={{
              color: s.color,
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {s.value}
          </span>
        </div>
      ))}

      {/* Progress bar */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, height: "4px", background: "#2a2a2a", borderRadius: "2px" }}>
          <div
            style={{
              width: `${progressPct}%`,
              height: "100%",
              background: "linear-gradient(90deg,#EF9F27,#5DCAA5)",
              borderRadius: "2px",
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
