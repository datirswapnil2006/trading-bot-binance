⚡ Fast and scalable backend
 Tech Stack
- Python
- FastAPI
- Binance Futures API
- Pydantic
- Uvicorn
- python-dotenv


 1. Place Order
POST `/order`
  Request Body:
```json
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "MARKET",
  "quantity": 0.002
}

Response:
{
  "status": "SUCCESS",
  "order": {
    "id": 123456,
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "MARKET",
    "price": 65000,
    "quantity": 0.002,
    "state": "NEW",
    "time": 1710000000000
  }
}

 2. AI Trading

GET /ai-trade
Automatically analyzes price
Generates BUY/SELL signal
Executes trade

 Response:
{
  "status": "SUCCESS",
  "signal": "BUY",
  "market_price": 65000,
  "order": {
    "symbol": "BTCUSDT",
    "side": "BUY",
    "price": 65000,
    "quantity": 0.002,
    "state": "NEW"
  }
}

 3. Health Check
GET /
Response:
{
  "message": "Trading Bot API is running 🚀"
}

 AI Strategy
This project uses a simple trend-based strategy:

Condition	Action
Price increases 📈	BUY
Price decreases 📉	SELL
No change ➖	HOLD

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/your-username/trading-bot.git
cd trading-bot/backend
2. Install Dependencies
pip install -r requirements.txt
3. Create .env File
API_KEY=your_binance_api_key
API_SECRET=your_binance_api_secret
️4. Run Server
uvicorn bot.api:app --reload

🌐 API Access
Base URL:
http://127.0.0.1:8000
Swagger Documentation:
http://127.0.0.1:8000/docs

Important Notes
MARKET orders may initially return:
price = 0
quantity = 0
This is expected behavior until the order is fully executed.

⚠️ Limitations
No order tracking after placement
Simple AI (rule-based, not ML)
Single trading pair (BTCUSDT)

 Future Improvements
 Order tracking (NEW → FILLED)
 Advanced indicators (RSI, MACD)
 Machine Learning model
 Risk management (Stop-loss / Take-profit)
 WebSocket-based backend updates

👨‍💻 Author
Swapnil Datir