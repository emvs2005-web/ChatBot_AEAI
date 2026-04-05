import { renderMarkdown } from "../../utils/helpers";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && (
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "linear-gradient(135deg,#EF9F27,#E24B4A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            flexShrink: 0,
            marginRight: "8px",
            marginTop: "2px",
          }}
        >
          ⚡
        </div>
      )}
      <div
        style={{
          maxWidth: "75%",
          background: isUser ? "#EF9F27" : "#222",
          borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
          padding: "10px 14px",
          color: isUser ? "#000" : "#ddd",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
      />
    </div>
  );
}
