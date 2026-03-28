import argparse
import logging
import json

from bot.client import BinanceClient
from bot.orders import place_order
from bot.validators import validate_input
from bot.logging_config import setup_logging


def main():
    parser = argparse.ArgumentParser(description="Trading Bot CLI")

    parser.add_argument("--symbol", required=True, help="Trading pair (e.g., BTCUSDT)")
    parser.add_argument("--side", required=True, help="BUY or SELL")
    parser.add_argument("--type", required=True, help="MARKET or LIMIT")
    parser.add_argument("--quantity", type=float, required=True, help="Order quantity")
    parser.add_argument("--price", type=float, help="Price (required for LIMIT)")

    args = parser.parse_args()

    # Setup logging
    setup_logging()

    try:
        # Validate input
        validate_input(args.symbol, args.side, args.type, args.quantity, args.price)

        # Add your NEW Binance Testnet API keys here
        api_key = ""
        api_secret = ""

        client = BinanceClient(api_key, api_secret).get_client()

        # Place order
        order = place_order(
            client,
            args.symbol,
            args.side,
            args.type,
            args.quantity,
            args.price
        )

        print("\n ORDER RESULT:")

        # Format output
        if "error" in order:
            output = {
                "status": "FAILED",
                "error": order["error"]
            }
        else:
            output = {
                "status": "SUCCESS",
                "symbol": order.get("symbol"),
                "orderId": order.get("orderId"),
                "side": order.get("side"),
                "type": order.get("type"),
                "origQty": order.get("origQty"),
                "executedQty": order.get("executedQty"),
                "avgPrice": order.get("avgPrice"),
                "orderStatus": order.get("status"),
                "timestamp": order.get("updateTime")
            }

        # Print JSON output
        print(json.dumps(output, indent=4))

        # Log success
        logging.info(f"Order placed successfully: {output}")

    except Exception as e:
        error_output = {
            "status": "FAILED",
            "error": str(e)
        }

        print("\n ERROR:")
        print(json.dumps(error_output, indent=4))

        logging.error(f"Error occurred: {str(e)}")


if __name__ == "__main__":
    main()