import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatSidebar from "./ChatSidebar";

const STATUS_CONFIG = {
  checking: { color: "#888",   bg: "#1a1a1a", dot: "#888",    text: "Connecting to server..." },
  ok:       { color: "#5DCAA5",bg: "#0d1f18", dot: "#5DCAA5", text: "Server connected — AI Agent ready" },
  "no-key": { color: "#BA7517",bg: "#1f1500", dot: "#EF9F27", text: "Server running but ANTHROPIC_API_KEY missing in .env" },
  offline:  { color: "#E24B4A",bg: "#1f0d0d", dot: "#E24B4A", text: "Backend server offline — run: npm run server" },
};

function TypingIndicator() {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
      <div style={{ width:"28px",height:"28px",borderRadius:"8px",background:"linear-gradient(135deg,#EF9F27,#E24B4A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px" }}>⚡</div>
      <div style={{ display:"flex",gap:"4px" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#EF9F27",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatTab({ tasks, messages, input, setInput, loading, sendMessage, serverStatus }) {
  const chatEndRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const s = STATUS_CONFIG[serverStatus] || STATUS_CONFIG.checking;
  const ready = serverStatus === "ok";

  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 280px",gap:"20px" }}>
      <div style={{ background:"#161616",borderRadius:"12px",border:"1px solid #222",display:"flex",flexDirection:"column",height:"600px" }}>

        {/* Header */}
        <div style={{ padding:"14px 20px",borderBottom:"1px solid #222",display:"flex",alignItems:"center",gap:"10px" }}>
          <div style={{ width:"10px",height:"10px",borderRadius:"50%",background:s.dot,boxShadow: ready ? `0 0 6px ${s.dot}` : "none",transition:"all 0.3s" }} />
          <span style={{ color:"#fff",fontWeight:"600",fontSize:"14px" }}>AI Productivity Agent</span>
          <span style={{ color:"#555",fontSize:"12px",marginLeft:"auto" }}>Powered by Claude</span>
        </div>

        {/* Status Banner */}
        <div style={{ padding:"9px 16px",background:s.bg,borderBottom:"1px solid #222",display:"flex",alignItems:"center",gap:"8px" }}>
          <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:s.dot,flexShrink:0 }} />
          <span style={{ color:s.color,fontSize:"12px" }}>{s.text}</span>
          {serverStatus === "no-key" && (
            <span style={{ marginLeft:"auto",color:"#555",fontSize:"11px",fontFamily:"monospace" }}>
              Edit .env → restart server
            </span>
          )}
        </div>

        {/* Messages */}
        <div style={{ flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:"12px" }}>
          {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
          {loading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding:"12px 16px",borderTop:"1px solid #222" }}>
          <div style={{ display:"flex",gap:"8px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={ready ? "Ask me about your schedule, productivity tips..." : "Waiting for server..."}
              disabled={!ready}
              style={{ flex:1,background:"#0f0f0f",border:"1px solid #333",borderRadius:"8px",padding:"10px 14px",color: ready ? "#fff" : "#555",fontSize:"13px",outline:"none",cursor: ready ? "text" : "not-allowed" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim() || !ready}
              style={{ background:(loading||!input.trim()||!ready) ? "#1a1a1a" : "#EF9F27",border:"none",borderRadius:"8px",color:(loading||!ready) ? "#444" : "#000",padding:"10px 16px",fontWeight:"700",fontSize:"13px",cursor:(loading||!ready) ? "not-allowed" : "pointer",transition:"all 0.15s" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <ChatSidebar tasks={tasks} setInput={setInput} />
    </div>
  );
}
