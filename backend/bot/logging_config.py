import logging

def setup_logging():
    logging.basicConfig(
        filename="trading_bot.log",   # log file name
        level=logging.INFO,           # log level
        format="%(asctime)s - %(levelname)s - %(message)s"
    )