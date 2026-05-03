

#  Task Manager API

A RESTful Task Management API built with Node.js, Express, and MongoDB.  
This project demonstrates clean architecture, authentication, and advanced querying features.

---

##  Features

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

##  Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

##  API Endpoints

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

##  Postman Collection

Postmen collection Link = https://janithkushara-4340233.postman.co/workspace/New-Team-Workspace~c5a676be-e30e-4078-bd38-59d23b8434cc/collection/51060215-093daa20-80dc-4339-b68d-26f8021ce213?action=share&creator=51060215
You can test all API endpoints using the Postman collection included in this repository.

### Steps:
1. Download the collection from `/postman` folder
2. Import into Postman
3. Set environment variables:
   - base_url = http://localhost:5000
   - token = your JWT token

4. Start testing 



##  Example Request

GET /api/task/gettask?search=project&sort=createdAt_desc&page=1&limit=5

---

##  Project Structure

controllers/
services/
middlewares/
models/
routes/

---

##  Key Learnings

- Implemented clean architecture
- Built reusable service layer
- Designed scalable API structure
- Applied middleware-based validation
- Centralized error handling

---

##  Future Improvements

- Add task priority & due dates
- Add role-based access control
- Deploy API (Render/Railway)


