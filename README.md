# 💰 AI Expense Tracker

### Track Expenses. Analyze Spending. Save Smarter.

AI Expense Tracker is a full-stack personal finance management application that helps users monitor income, track expenses, visualize financial data, and receive AI-powered financial insights. Built with the MERN Stack and powered by Google Gemini AI, the application transforms raw financial data into meaningful recommendations.

---

## ✨ Features

### 📊 Expense & Income Management

* Add, edit, and delete income records
* Add, edit, and delete expense records
* Categorize transactions for better organization
* Track financial activity in real time

### 🤖 AI-Powered Insights

* Generate personalized financial summaries
* Identify top spending categories
* Receive smart saving recommendations
* Detect unusual spending patterns
* Get AI-generated financial health suggestions

### 📈 Analytics & Visualization

* Interactive dashboard overview
* Income vs Expense comparison
* Category-wise expense breakdown
* Monthly financial trends
* Pie Charts and Bar Graphs

### 🔐 Authentication & Security

* User registration and login
* JWT-based authentication
* Protected routes and secure API access

### 📥 Export Data

* Download income records as Excel files
* Manage financial reports efficiently

### 📱 Modern UI

* Responsive design for all devices
* Clean and intuitive user experience
* Glassmorphism-inspired components
* Fast and interactive dashboard

---

## 🛠 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)

### AI & LLM Integration

![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75FF?style=for-the-badge\&logo=google-gemini\&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge\&logo=openai\&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge)
![Generative AI](https://img.shields.io/badge/Generative_AI-Powered-blueviolet?style=for-the-badge)

### Tools

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge\&logo=visualstudiocode\&logoColor=white)


---

## 📂 Project Structure

```bash
AI-Expense-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── utils/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── uploads/
│   └── server.js
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/om-muddapur7/AI-Expense-Tracker.git

cd AI-Expense-Tracker
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Start the Application

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 🌐 Usage

1. Create an account or log in
2. Add your income sources
3. Record daily expenses
4. View dashboard analytics
5. Generate AI-powered financial insights
6. Download financial reports

---

## 📸 Screenshots

### Dashboard

<img width="1882" height="887" alt="image" src="https://github.com/user-attachments/assets/b6367546-6d39-44b5-84a1-e5b7ac0bfe42" />

### AI Insights

<img width="1862" height="833" alt="image" src="https://github.com/user-attachments/assets/1a255aab-6dd1-401b-9578-d0090f9f126d" />


### Income Management

<img width="1876" height="886" alt="image" src="https://github.com/user-attachments/assets/375f9146-5801-498a-bc59-f66e7e34a26d" />


### Expense Management

<img width="1865" height="862" alt="image" src="https://github.com/user-attachments/assets/d7862575-2675-4695-a31b-3f0ba2839df5" />


---

## 🚀 Future Enhancements

* 🎯 Budget Planning & Goal Tracking
* 📅 Monthly Spending Forecasts
* 🔔 Smart Expense Alerts
* 💳 Bank Account Integration
* 📈 Advanced Financial Analytics
* 📱 Progressive Web App (PWA)
* ☁️ Cloud Backup & Sync

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Om Muddapur**

GitHub: https://github.com/om-muddapur7

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Your support motivates future improvements and new features!
