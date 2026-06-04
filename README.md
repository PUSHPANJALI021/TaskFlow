# TaskFlow  🗂️ — MERN Task Manager

 TaskFlow — A secure, full-stack task manager built on the MERN stack with JWT authentication and real-time CRUD. Your tasks. Your flow. One app to rule them all.

---

## Features

- JWT-based user authentication (Register / Login / Logout)
- Create, view, update, and delete tasks
- Toggle task status between pending and completed
- Protected routes — dashboard accessible only when logged in
- Responsive UI with glassmorphism design and gradient theme

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcryptjs |

---

## Project Structure

```
task-manager/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── api/          # Axios instance with interceptor
│       ├── context/      # AuthContext (global auth state)
│       ├── components/   # PrivateRoute
│       └── pages/        # Login, Register, Dashboard
│
└── server/               # Express backend
    ├── controllers/      # auth.controller.js, task.controller.js
    ├── middleware/        # auth.middleware.js (JWT verify)
    ├── models/           # User.js, Task.js (Mongoose schemas)
    ├── routes/           # auth.routes.js, task.routes.js
    └── server.js         # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/PUSHPANJALI021/TaskFlow.git
cd TaskFlow
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key
```

Start the backend:

```bash
npm run dev
```

You should see:
```
MongoDB connected ✅
Server running on port 5000 ✅
```

### 3. Setup the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Tasks (Protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for logged-in user |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task title/description |
| PATCH | `/api/tasks/:id` | Toggle task status |
| DELETE | `/api/tasks/:id` | Delete a task |

<img width="634" height="482" alt="image" src="https://github.com/user-attachments/assets/085774b8-f08f-4d7f-8c32-9aa75984084a" />

<img width="763" height="501" alt="image" src="https://github.com/user-attachments/assets/8f2c7fb6-0bf9-4cf0-b79e-0db36ede936e" />



