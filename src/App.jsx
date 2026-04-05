import { useProductivity } from "./hooks/useProductivity";
import Header from "./components/Header/Header";
import StatsBar from "./components/StatsBar/StatsBar";
import ScheduleTab from "./components/Schedule/ScheduleTab";
import TasksTab from "./components/Tasks/TasksTab";
import ChatTab from "./components/Chat/ChatTab";
import "./index.css";

export default function App() {
  const {
    tasks, messages, input, loading,
    activeTab, showAddTask, newTask, serverStatus,
    setInput, setActiveTab, setShowAddTask, setNewTask,
    toggleDone, deleteTask, addTask, sendMessage,
  } = useProductivity();

  return (
    <div className="app-root">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatsBar tasks={tasks} />
      <main className="app-main">
        {activeTab === "schedule" && (
          <ScheduleTab tasks={tasks} toggleDone={toggleDone} setActiveTab={setActiveTab} />
        )}
        {activeTab === "tasks" && (
          <TasksTab
            tasks={tasks} toggleDone={toggleDone} deleteTask={deleteTask}
            showAddTask={showAddTask} setShowAddTask={setShowAddTask}
            newTask={newTask} setNewTask={setNewTask} addTask={addTask}
          />
        )}
        {activeTab === "chat" && (
          <ChatTab
            tasks={tasks} messages={messages} input={input}
            setInput={setInput} loading={loading} sendMessage={sendMessage}
            serverStatus={serverStatus}
          />
        )}
      </main>
    </div>
  );
}
