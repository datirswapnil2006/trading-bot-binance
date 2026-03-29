from fastapi import FastAPI
from pydantic import BaseModel
import logging
import os

from bot.client import BinanceClient
from bot.orders import place_order
from bot.validators import validate_input
from bot.logging_config import setup_logging
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from bot.ai_strategy import SimpleAITrader

# Load env
load_dotenv()

# Setup
app = FastAPI()
setup_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API keys
api_key = os.getenv("API_KEY")
api_secret = os.getenv("API_SECRET")

client = BinanceClient(api_key, api_secret).get_client()
ai_trader = SimpleAITrader()

# Request model
class OrderRequest(BaseModel):
    symbol: str
    side: str
    type: str
    quantity: float
    price: float | None = None


@app.get("/")
def home():
    return {"message": "Trading Bot API is running 🚀"}


# 🤖 AI TRADING
@app.get("/ai-trade")
def ai_trade():
    price = float(client.futures_mark_price(symbol="BTCUSDT")["markPrice"])
    signal = ai_trader.get_signal(price)

    if signal == "BUY":
        result = place_order(client, "BTCUSDT", "BUY", "MARKET", 0.002)
    elif signal == "SELL":
        result = place_order(client, "BTCUSDT", "SELL", "MARKET", 0.002)
    else:
        return {"status": "HOLD"}

    return format_response(result, signal, price)


# 📦 ORDER API
@app.post("/order")
def create_order(order: OrderRequest):
    try:
        validate_input(order.symbol, order.side, order.type, order.quantity, order.price)

        result = place_order(
            client,
            order.symbol,
            order.side,
            order.type,
            order.quantity,
            order.price
        )

        return format_response(result)

    except Exception as e:
        logging.error(str(e))
        return {"status": "FAILED", "error": str(e)}


# 🔥 COMMON RESPONSE FORMATTER (IMPORTANT FIX)
def format_response(result, signal=None, current_price=None):
    if "error" in result:
        return {
            "status": "FAILED",
            "error": result["error"]
        }

    return {
        "status": "SUCCESS",
        "signal": signal,
        "market_price": current_price,
        "order": {
            "id": result.get("orderId"),
            "symbol": result.get("symbol"),
            "side": result.get("side"),
            "type": result.get("type"),

            # FIXED FIELDS
            "price": float(result.get("avgPrice") or result.get("price") or 0),
            "quantity": float(result.get("executedQty") or result.get("origQty") or 0),

            "state": result.get("status"),
            "time": result.get("updateTime")
        }
    }