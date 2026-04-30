

# 📝 Task Manager API

A RESTful Task Management API built with Node.js, Express, and MongoDB.  
This project demonstrates clean architecture, authentication, and advanced querying features.

---

## 🚀 Features

- User Authentication (JWT)
- Create, Read, Update, Delete Tasks
- Filter tasks by completion status
- Search tasks by title (case-insensitive)
- Sort tasks (e.g., createdAt_desc, title_asc)
- Pagination support
- Validation Middleware (clean input handling)
- Global Error Handling
- Clean Architecture (Controller → Service → Middleware)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📌 API Endpoints

### 🔹 Create Task
POST /api/task/addtask

### 🔹 Get Tasks
GET /api/task/gettask?search=work&completed=true&page=1&limit=5

### 🔹 Get Task by ID
GET /api/task/gettaskbyid/:taskId

### 🔹 Update Task
PUT /api/task/update/:taskId

### 🔹 Delete Task
DELETE /api/task/delete/:taskId

---

## 🧪 Example Request

GET /api/task/gettask?search=project&sort=createdAt_desc&page=1&limit=5

---

## 📂 Project Structure

controllers/
services/
middlewares/
models/
routes/

---

## 💡 Key Learnings

- Implemented clean architecture
- Built reusable service layer
- Designed scalable API structure
- Applied middleware-based validation
- Centralized error handling

---

## 🌐 Future Improvements

- Add task priority & due dates
- Add role-based access control
- Deploy API (Render/Railway)
