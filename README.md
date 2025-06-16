# 🚀 Business Dashboard API & Frontend

A minimal, token-based login and internal messaging API + frontend dashboard for a small business, built with **NestJS** (backend) and **Vite + React** (frontend).

---

## 📋 Features

- 🔐 **Login Endpoint:** Accepts email, returns a mock JWT (no password required)  
- 👤 **Protected User Endpoint:** `GET /me` returns a sample user profile  
- 💬 **Messaging:** Send and receive messages between users (in-memory storage)  
- 🛡️ **JWT Authentication** with guards  
- ✅ **Input validation** using `class-validator`  
- 📝 **Swagger API documentation** included  
- 🚫 **No database needed** — uses in-memory/mock data for simplicity  

---

## 🛠️ Technologies Used

| Backend                   | Frontend                  |
|--------------------------|---------------------------|
| [NestJS](https://nestjs.com/)          | [React](https://reactjs.org/)               |
| [TypeScript](https://www.typescriptlang.org/) | [Vite](https://vitejs.dev/)                 |
| [JWT](https://jwt.io/)              | [React Router](https://reactrouter.com/)          |
| [Swagger](https://swagger.io/)          | [Axios](https://axios-http.com/)             |
| [class-validator](https://github.com/typestack/class-validator) |                             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)

---

### Backend Setup (NestJS API)

1. **Install dependencies**

```bash
cd backend
npm install
```

2. **Run the backend API in development mode**

```bash
npm run start:dev
```

The backend server will be running on:  
`http://localhost:3000`

3. **Swagger API docs**

Visit:  
`http://localhost:3000/api`

---

### Frontend Setup (React + Vite)

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Run frontend**

```bash
npm run dev
```

The frontend will open at:  
`http://localhost:5173`

---

## 🔐 API Endpoints

| Endpoint       | Method | Description                       | Auth Required |
|----------------|--------|---------------------------------|---------------|
| `/auth/login`  | POST   | Login with email, get mock JWT   | No            |
| `/me`          | GET    | Get current user profile         | Yes           |
| `/messages`    | GET    | Get all messages for current user| Yes           |
| `/messages`    | POST   | Send a message                   | Yes           |
| `/messages/:id`| GET    | Get a specific message           | Yes           |

---

## 🛡️ Authentication

- JWT token is returned from login and must be added as an `Authorization` header:  
  `Authorization: Bearer <token>`
- Protected routes verify this token with a guard

---

## 📚 Validation

- All incoming requests are validated with `class-validator` decorators for strict input control.

---

## 🧩 Project Structure Overview

```
backend/
├── src/
│   ├── auth/          # JWT strategy, login logic
│   ├── users/         # User entities and profile
│   ├── messages/      # Messaging logic and controllers
│   ├── main.ts        # Application bootstrap
frontend/
├── src/
│   ├── components/    # React UI components
│   ├── pages/         # React pages (Login, Dashboard, Messages)
│   ├── services/      # API calls with Axios
│   ├── App.tsx        # Main React app
│   ├── main.tsx       # Entry point
```

---

## 💡 Tips for Usage

- Use **Postman** or **Swagger UI** to test backend APIs during development
- Frontend consumes backend APIs — ensure backend is running before frontend
- This setup is for **development/testing** — for production, add a real database, better JWT secrets, HTTPS, etc.

---

## 📞 Contact


**Author:** [Abdul Wasih Payman]  
**Email:** [paymanwasih240@gmail.com]  

---

✨ First Think Then Code ✨
