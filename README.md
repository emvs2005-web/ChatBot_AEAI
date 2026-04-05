# ⚡ ProductivityAI — Daily Task Scheduling Agent

---

## 📁 File Structure

```
productivity-agent/
├── .env                          ← YOUR API KEY GOES HERE (never commit!)
├── .env.example                  ← Template for the .env file
├── .gitignore
├── index.html                    ← Vite HTML entry
├── vite.config.js
├── package.json
│
├── server/
│   └── index.js                  ← Express proxy (avoids CORS, keeps key safe)
│
└── src/
    ├── main.jsx
    ├── App.jsx                   ← Root component
    ├── index.css                 ← Global styles
    ├── constants/index.js        ← Tasks, priorities, prompts
    ├── utils/helpers.js          ← Pure helper functions
    ├── hooks/useProductivity.js  ← All state + API logic
    └── components/
        ├── Header/Header.jsx
        ├── StatsBar/StatsBar.jsx
        ├── Schedule/
        │   ├── ScheduleTab.jsx
        │   ├── Timeline.jsx
        │   └── SidePanel.jsx
        ├── Tasks/
        │   ├── TasksTab.jsx
        │   ├── TaskItem.jsx
        │   └── AddTaskForm.jsx
        └── Chat/
            ├── ChatTab.jsx
            ├── ChatMessage.jsx
            └── ChatSidebar.jsx
```

---

## 🚀 Setup (3 steps)

### Step 1 — Get your free API key
1. Go to **https://console.anthropic.com/**
2. Sign up (free) → go to **API Keys** → click **Create Key**
3. Copy the key (starts with `sk-ant-api03-...`)

### Step 2 — Add the key to .env
Open `.env` and replace the placeholder:
```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_ACTUAL_KEY_HERE
```

### Step 3 — Install & run
```bash
npm install
npm start
```

This starts **both** the React frontend (port 3000) and the Express backend (port 3001) together.

Open **http://localhost:3000** in your browser.

---

## 🔧 Why a backend server?

Browsers block direct calls to external APIs (CORS policy).  
The Express server at `server/index.js` acts as a proxy:

```
Browser → localhost:3001/api/chat → Anthropic API
```

This also keeps your API key secure — it never touches the browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📅 Schedule View | Hour-by-hour timeline, click to toggle done |
| ✅ Tasks View | Add / delete / complete tasks |
| 🤖 AI Chat Agent | Claude sees your full task list as context |
| 📊 Stats Bar | Live progress, priority count, time totals |
| 🔥 Priority System | High / Medium / Low colour-coded |
| 📁 Categories | Work, Meeting, Break, Personal, Admin, Learning |
| ⚡ Quick Prompts | 8 one-click prompts |
| 🟢 Server Status | Live indicator showing backend health |
