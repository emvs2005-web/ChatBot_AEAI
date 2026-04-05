import { useState, useRef, useEffect } from "react";
import { INITIAL_TASKS, INITIAL_MESSAGES, CATEGORIES } from "../constants";
import { buildTaskSummary } from "../utils/helpers";

export function useProductivity() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");
  const [showAddTask, setShowAddTask] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking"); // "ok" | "no-key" | "offline"

  const [newTask, setNewTask] = useState({
    title: "",
    time: "09:00",
    duration: 30,
    priority: "medium",
    category: "Work",
  });

  const nextId = useRef(100);

  // ✅ FIXED: Robust server health check with Render cold start support
  useEffect(() => {
    const checkServer = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // Render free tier can take up to 15s on cold start

        const res = await fetch("https://chatbot-aeai.onrender.com/api/health", {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        if (data.status === "ok") {
          setServerStatus(data.apiKeySet ? "ok" : "no-key");
        } else {
          setServerStatus("offline");
        }
      } catch (error) {
        console.error("❌ Health check failed:", error.message);
        setServerStatus("offline");
      }
    };

    checkServer();
  }, []);

  const toggleDone = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const addTask = () => {
    if (!newTask.title.trim()) return;

    setTasks((prev) => [
      ...prev,
      { ...newTask, id: nextId.current++, done: false },
    ]);

    setNewTask({
      title: "",
      time: "09:00",
      duration: 30,
      priority: "medium",
      category: CATEGORIES[0],
    });

    setShowAddTask(false);
  };

  // ✅ FIXED: Chat API with better error handling
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg },
    ]);
    setLoading(true);

    try {
      const systemPrompt = `You are a smart daily productivity and task scheduling agent.

Current date/time: ${new Date().toLocaleString()}
Tasks:
${buildTaskSummary(tasks)}

Give concise, actionable advice.`;

      const history = messages
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // Extended timeout for Render free tier

      const res = await fetch("https://chatbot-aeai.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          system: systemPrompt,
          messages: [...history, { role: "user", content: userMsg }],
        }),
      });

      clearTimeout(timeout);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      console.log("API response:", data); // Log for debugging

      const reply = data.reply || "Sorry, I couldn't process that.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      console.error("❌ Chat error:", err.message);

      const msg =
        err.name === "AbortError"
          ? "Request timed out. Server may be starting up. Try again in a few seconds."
          : err.message?.includes("Failed to fetch")
          ? "Cannot reach backend server. Please try again."
          : err.message;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${msg}` },
      ]);

      setServerStatus("offline"); // update UI if server fails
    }

    setLoading(false);
  };

  return {
    tasks,
    messages,
    input,
    loading,
    activeTab,
    showAddTask,
    newTask,
    serverStatus,
    setInput,
    setActiveTab,
    setShowAddTask,
    setNewTask,
    toggleDone,
    deleteTask,
    addTask,
    sendMessage,
  };
}