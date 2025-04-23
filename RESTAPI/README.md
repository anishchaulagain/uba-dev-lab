# 👨‍💻 User Management REST API (TypeScript + Express + Zod)

A simple and clean **CRUD REST API** built using **Express.js**, **TypeScript**, and **Zod** for validation. This project follows a modular structure with a focus on maintainability and clean code practices.

---

## 📦 Tech Stack

- **TypeScript**
- **Express.js**
- **Zod** – Request validation
- **Node.js**
- **dotenv** – Environment variables

---

1. Clone the repo
2. Install the dependencies using `npm install`
3. Set up your environment variables in a `.env` file (PORT=5000)
4. Start the server using `npm start` and access the API at `http://localhost:5000`


**End Points:**
GET	         /api/users	             Get all users
GET	         /api/users/:email       Get user by email
POST	     /api/users	             Create a new user
PUT	         /api/users/:email	     Update user by email
DELETE       /api/users/:email	     Delete user by email