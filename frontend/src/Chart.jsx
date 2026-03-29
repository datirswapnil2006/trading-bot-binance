import { useEffect, useRef } from "react";

function Chart() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        container_id: container.current.id,
        width: "100%",
        height: 400,
        symbol: "BINANCE:BTCUSDT",
        interval: "5",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1", // Candlestick
        locale: "en",
        toolbar_bg: "#0f172a",
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div id="tradingview_chart" ref={container}></div>;
}

export default Chart;