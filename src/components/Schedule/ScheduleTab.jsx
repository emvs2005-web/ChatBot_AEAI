import Timeline from "./Timeline";
import SidePanel from "./SidePanel";

export default function ScheduleTab({ tasks, toggleDone, setActiveTab }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
      <Timeline tasks={tasks} toggleDone={toggleDone} />
      <SidePanel tasks={tasks} setActiveTab={setActiveTab} />
    </div>
  );
}
