const TABS = [
  { id: "schedule", icon: "📅", label: "Schedule" },
  { id: "tasks", icon: "✅", label: "Tasks" },
  { id: "chat", icon: "🤖", label: "AI Agent" },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <div
      style={{
        background: "#0f0f0f",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #222",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg,#EF9F27,#E24B4A)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: "600", fontSize: "15px", letterSpacing: "-0.3px" }}>
            ProductivityAI
          </div>
          <div style={{ color: "#666", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
            Daily Task Agent
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              background: activeTab === tab.id ? "#EF9F27" : "#1a1a1a",
              color: activeTab === tab.id ? "#000" : "#888",
              transition: "all 0.15s",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
