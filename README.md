# Real-time Collaborative Code Editor

A powerful, full-stack collaborative code editor designed for developers to write, draw, chat, and brainstorm together — all in real-time. Whether you're pair programming, running a coding interview, or hosting a team hackathon.

---
Make Sure That the Server is running first as it goes to idle mode.
[Server](https://realtime-code-collab-uvx5.onrender.com)


------
## 🚀 Features

### ✍️ Code Collaboration
- Real-time collaborative code editing with [CodeMirror](https://codemirror.net/)
- Language highlighting and theme support
- Save/load entire project directories as `.zip` files

### 🧾 Whiteboard
- Fully synced multi-page whiteboard using [Tldraw](https://tldraw.dev/)
- Great for sketching algorithms, flowcharts, system design, etc.

### 💬 Group Chat
- Live chat panel for seamless communication
- Auto-scrolling, timestamps, and username support

### 🗂️ Advanced File Explorer
- Custom-built file system architecture
- Multi-file support with active tab view
- Supports nested folders and state persistence
---

## 🛠️ Tech Stack

**Frontend**  
- React + Vite  
- TypeScript  
- Zustand for global state  
- CodeMirror + Tldraw  
- TailwindCSS  

**Backend**  
- Node.js + Express  
- Socket.IO for real-time sync  
- Multer + JSZip for file uploads/downloads  

