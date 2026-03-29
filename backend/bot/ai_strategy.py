import time

class SimpleAITrader:
    def __init__(self):
        self.last_price = None

    def get_signal(self, current_price):
        if self.last_price is None:
            self.last_price = current_price
            return "HOLD"

        if current_price > self.last_price:
            signal = "BUY"
        elif current_price < self.last_price:
            signal = "SELL"
        else:
            signal = "HOLD"

        self.last_price = current_price
        return signal