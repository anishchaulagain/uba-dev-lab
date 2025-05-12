# 👨‍💻 User Management REST API (TypeScript + Express + Zod + Unit Tesing(JEST))

A simple and clean **CRUD REST API** built using **Express.js**, **TypeScript**, and **Zod** for validation along with controller unit testing with **JEST**. This project follows a modular structure with a focus on maintainability and clean code practices.

---
What's Covered:

✅ Controller Unit Tests (getAllUser, getOneUser, etc.)

✅ Mocking request/response objects

✅ Mocking helper functions and data

✅ Error handling validation

✅ Isolated and maintainable test structure

## 📦 Tech Stack

- **TypeScript**
- **Express.js**
- **Zod** – Request validation
- **Node.js**
- **dotenv** – Environment variables
- **Jest** – Testing framework
- **ts-jest** – TypeScript support for Jest
- **Supertest** – (Optional) For integration tests


---

1. Clone the repo
2. Install the dependencies using `npm install`
3. Set up your environment variables in a `.env` file (PORT=5000)
4. Start the server using `npm start` and access the API at `http://localhost:3000`


**End Points:**

GET	         /users	             Get all users

GET	         /users/:email       Get user by email

POST	     /users	             Create a new user

PUT	         /users/:email	     Update user by email

DELETE       /users/:email	     Delete user by email