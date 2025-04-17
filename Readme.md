# 🛍️ Comeback — Node.js + Express Ecommerce Backend

**Comeback** is an ecommerce backend built using **Node.js**, **Express.js**, and **MongoDB**. This server handles user authentication and is designed to be scalable and modular for future features.

---

## 📁 Project Structure

```
comeback/
│
├── controllers/       # Request handlers
├── models/            # Mongoose models
├── routes/            # Express route definitions
├── config/            # Configuration files (e.g., DB connection)
├── .env               # Environment variables
├── .gitignore         # Ignored files/folders
├── index.js           # Entry point
└── package.json       # Project metadata and dependencies
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### 📥 Installation

```bash
git clone https://github.com/gbibek34/comeback.git
cd comeback
npm install
```

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=<empty port>
MONGO_URI=mongodb://localhost:27017/<database_name | might need other auth details>
JWT_SECRET=<jwt_secret_key>
```

---

## 🧪 Running the Server

### In Development:

```bash
npm start
```

(using [nodemon](https://www.npmjs.com/package/nodemon))

---

## 📦 Built With

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv]
- [bcrypt]

---

## 📜 License

ISC License. See `LICENSE` file for details.

---

## 👨‍💻 Author

Made with ❤️ by [Bibek](https://github.com/gbibek34) and [Safal](https://github.com/safalpokharel)
