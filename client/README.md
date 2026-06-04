# TaskFlow 🗂️

> Where security meets simplicity. Powered by the MERN stack with JWT authentication and real-time CRUD — because your tasks deserve more than a sticky note.

## Tech Stack
MongoDB • Express.js • React.js • Node.js • JWT • bcryptjs

## Setup

**Backend**
```bash
cd server
npm install
# create .env with PORT, MONGO_URI, JWT_SECRET
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | ✗ | Register user |
| POST | `/api/auth/login` | ✗ | Login + get token |
| GET | `/api/tasks` | ✓ | Get all tasks |
| POST | `/api/tasks` | ✓ | Create task |
| PATCH | `/api/tasks/:id` | ✓ | Toggle status |
| DELETE | `/api/tasks/:id` | ✓ | Delete task |

## Features
- JWT authentication with protected routes
- Create, toggle, and delete tasks
- Glassmorphism UI with gradient theme
  
