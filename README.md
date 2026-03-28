# 🚀 Trading Bot (Binance Futures Testnet)

## 📌 Overview

This project is a **Python-based CLI trading bot** that allows users to place **Market and Limit orders** on the Binance Futures Testnet (USDT-M).

It is designed with a clean, modular structure, proper logging, and robust error handling.


## ✨ Features

*  Place **MARKET orders**
*  Place **LIMIT orders**
*  Supports both **BUY and SELL**
*  CLI-based input using argparse
*  Input validation
*  Structured code (client, orders, validators, CLI)
*  Logging of API requests and responses
*  JSON formatted output



## 🛠️ Tech Stack

* Python 3.x
* python-binance library
* argparse (CLI handling)
* logging module



## 📂 Project Structure


trading_bot/
│
├── bot/
│   ├── __init__.py
│   ├── client.py          # Binance API wrapper
│   ├── orders.py          # Order logic
│   ├── validators.py      # Input validation
│   ├── logging_config.py  # Logging setup
│   └── cli.py             # CLI entry point
│
├── requirements.txt
├── README.md
├── trading_bot.log


## ⚙️ Setup Instructions

### 1️⃣ Clone Repository


git clone <your-repo-link>
cd trading_bot

### 2️⃣ Create Virtual Environment

python -m venv venv
venv\Scripts\activate   # Windows


### 3️⃣ Install Dependencies


pip install -r requirements.txt

## 🔑 Binance Testnet Setup

1. Go to: https://testnet.binancefuture.com
2. Create an account
3. Generate API Key & Secret
4. Add keys in `cli.py`:


api_key = "YOUR_API_KEY"
api_secret = "YOUR_SECRET_KEY"

##  Usage

### 📌 Run MARKET Order

python -m bot.cli --symbol BTCUSDT --side BUY --type MARKET --quantity 0.002

### 📌 Run LIMIT Order

python -m bot.cli --symbol BTCUSDT --side SELL --type LIMIT --quantity 0.002 --price 100000


## 📊 Example Output

```json
{
    "status": "SUCCESS",
    "symbol": "BTCUSDT",
    "orderId": 12345678,
    "side": "BUY",
    "type": "MARKET",
    "origQty": "0.002",
    "executedQty": "0.002",
    "avgPrice": "65000",
    "orderStatus": "FILLED",
    "timestamp": 1710000000000
}

## 🧾 Logging

* Logs are stored in:

trading_bot.log


* Includes:

  * API requests
  * Responses
  * Errors



## ⚠️ Assumptions

* Minimum notional value must be ≥ 100 USDT (Binance rule)
* API keys are valid and Futures trading is enabled
* Internet connection is stable


## 🚀 Future Improvements (Bonus Ideas)

* Add Stop-Limit / OCO orders
* Interactive CLI (menu-based UI)
* Web dashboard (Flask/React)
* Order history tracking


## 👨‍💻 Author

Swapnil Datir


## 📩 Submission

GitHub repository link + logs submitted as per assignment instructions.
