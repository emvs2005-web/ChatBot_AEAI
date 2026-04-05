export const PRIORITIES = {
  high: { label: "High", color: "#E24B4A", bg: "#FCEBEB" },
  medium: { label: "Medium", color: "#BA7517", bg: "#FAEEDA" },
  low: { label: "Low", color: "#3B6D11", bg: "#EAF3DE" },
};

export const CATEGORIES = ["Work", "Meeting", "Break", "Personal", "Admin", "Learning"];

export const INITIAL_TASKS = [
  { id: 1, title: "Team standup meeting", time: "09:00", duration: 30, priority: "high", done: false, category: "Meeting" },
  { id: 2, title: "Review project proposal", time: "10:00", duration: 60, priority: "high", done: false, category: "Work" },
  { id: 3, title: "Lunch break", time: "13:00", duration: 60, priority: "low", done: false, category: "Break" },
  { id: 4, title: "Write unit tests", time: "14:30", duration: 90, priority: "medium", done: false, category: "Work" },
  { id: 5, title: "Reply to emails", time: "16:00", duration: 30, priority: "low", done: true, category: "Admin" },
];

export const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "👋 Hello! I'm your **Daily Productivity Agent**. I can help you:\n- Schedule and prioritize your tasks\n- Optimize your daily workflow\n- Suggest time blocks for deep work\n- Give productivity tips\n\nTell me about your day or ask me to analyze your schedule!",
  },
];

export const QUICK_PROMPTS = [
  "Analyze my schedule for today",
  "What should I focus on first?",
  "How can I optimize my workflow?",
  "Suggest a productive morning routine",
  "I'm feeling overwhelmed, help me prioritize",
  "Schedule a 2-hour deep work block",
  "What tasks should I defer to tomorrow?",
  "Give me a productivity tip for today",
];

export const TIMELINE_HOURS = Array.from({ length: 14 }, (_, i) => i + 7);
