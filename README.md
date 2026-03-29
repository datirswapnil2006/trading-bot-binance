# 🚀 Trading Bot (Full Stack + AI + Real-Time)

## 📌 Overview

This project is a **full-stack trading bot** that integrates a **Python backend** with a **React.js frontend** to enable real-time cryptocurrency trading on the Binance Futures Testnet. It supports **market and limit orders (buy/sell)**, provides a **live trading dashboard**, and uses **WebSockets for real-time price updates**. The system is designed with a modular backend structure, proper logging, and a scalable frontend, making it a **portfolio-level fintech project**.

---

## ✨ Features

### 🔹 Trading

* ✅ Place MARKET orders
* ✅ Place LIMIT orders
* ✅ BUY / SELL support

### 🔹 Frontend Dashboard

* 📊 Clean React-based UI
* 📈 Live price updates
* 📜 Order tracking
* 💼 Portfolio view

### 🔹 Backend

* 🧩 Modular architecture
* 🛡️ Input validation
* 📜 Logging system
* ⚡ Fast execution

### 🔹 Real-Time

* 🔌 WebSocket integration
* 📡 Live market data

---

## 🛠️ Tech Stack

### Backend

* Python 3
* python-binance
* WebSockets
* Logging

### Frontend

* React.js
* Vite
* Axios

---

## 📂 Project Structure

```
TRADING_BOT/
│
├── backend/                  # Python Backend
│   ├── bot/                 # Core trading logic
│   ├── venv/                # Virtual environment
│   ├── .env                 # API keys (not shared)
│   ├── README.md            # Backend docs
│   ├── requirements.txt     # Dependencies
│   └── trading_bot.log      # Logs
│
├── frontend/                # React Frontend
│   ├── node_modules/        # Dependencies
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/datirswapnil2006/trading-bot-binance
cd trading-bot-binance
```

---

### 2️⃣ Backend Setup

```
cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

---

### 3️⃣ Frontend Setup

```
cd frontend

npm install
npm run dev
```

---

## 🔑 Environment Setup

Create `.env` inside backend:

```
API_KEY=your_api_key
API_SECRET=your_secret
```

---

## 🚀 Usage

### Run Backend

```
python -m bot.cli --symbol BTCUSDT --side BUY --type MARKET --quantity 0.002
```

---

### Run Frontend

```
npm run dev
```

---

## 📊 Example Output

```json
{
  "status": "SUCCESS",
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "MARKET",
  "executedQty": "0.002"
}
```

---

## 🧾 Logging

Logs are stored in:

```
backend/trading_bot.log
```

Includes:

* API calls
* Responses
* Errors

---

## ⚠️ Assumptions

* Binance Futures Testnet is used
* API keys are valid
* Minimum order value rules apply
* Internet connection required

---

## 🚀 Future Improvements

* 🤖 AI-based trading signals
* 📊 Advanced charts (RSI, MACD)
* 🌐 Deployment (Vercel + Backend hosting)
* 🔔 Alerts (Telegram/Email)

---

## 👨‍💻 Author

**Swapnil Datir**

---

## 📩 GitHub

👉 https://github.com/datirswapnil2006/trading-bot-binance
