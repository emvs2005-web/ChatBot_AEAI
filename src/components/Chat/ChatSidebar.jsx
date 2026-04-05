import { QUICK_PROMPTS } from "../../constants";
import { PRIORITIES } from "../../constants";
import { timeToMinutes } from "../../utils/helpers";

export default function ChatSidebar({ tasks, setInput }) {
  const sortedTasks = [...tasks]
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
    .slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Quick prompts */}
      <div
        style={{ background: "#161616", borderRadius: "12px", border: "1px solid #222", padding: "16px" }}
      >
        <div
          style={{
            color: "#888",
            fontSize: "11px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "12px",
          }}
        >
          Quick Prompts
        </div>
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInput(prompt)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: "#0f0f0f",
              border: "1px solid #222",
              borderRadius: "6px",
              padding: "8px 10px",
              color: "#aaa",
              fontSize: "12px",
              cursor: "pointer",
              marginBottom: "6px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#EF9F27";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#222";
              e.target.style.color = "#aaa";
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Tasks summary */}
      <div
        style={{ background: "#161616", borderRadius: "12px", border: "1px solid #222", padding: "16px" }}
      >
        <div
          style={{
            color: "#888",
            fontSize: "11px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "10px",
          }}
        >
          Today's Tasks
        </div>
        {sortedTasks.map((t) => (
          <div
            key={t.id}
            style={{ display: "flex", gap: "6px", marginBottom: "6px", alignItems: "center" }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: t.done ? "#5DCAA5" : PRIORITIES[t.priority].color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: t.done ? "#444" : "#888",
                fontSize: "12px",
                textDecoration: t.done ? "line-through" : "none",
              }}
            >
              {t.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
