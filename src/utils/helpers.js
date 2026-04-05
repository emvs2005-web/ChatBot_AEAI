export function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(m) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function calcStats(tasks) {
  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const highPriority = tasks.filter((t) => t.priority === "high" && !t.done).length;
  const totalMins = tasks.reduce((a, t) => a + t.duration, 0);
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, highPriority, totalMins, progressPct };
}

export function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, '<ul style="margin:6px 0 6px 16px;padding:0">$1</ul>')
    .replace(/\n/g, "<br/>");
}

export function buildTaskSummary(tasks) {
  return [...tasks]
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
    .map(
      (t) =>
        `- [${t.done ? "DONE" : "TODO"}] ${t.time} | ${t.title} (${t.duration}min, ${t.priority} priority, ${t.category})`
    )
    .join("\n");
}
