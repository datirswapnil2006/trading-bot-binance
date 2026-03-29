import { useState, useEffect } from "react";
import Chart from "./Chart";

function App() {
  const [form, setForm] = useState({
    symbol: "BTCUSDT",
    side: "BUY",
    type: "MARKET",
    quantity: "",
    price: ""
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [price, setPrice] = useState(null);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [autoAI, setAutoAI] = useState(false);

  useEffect(() => {
    const depthWs = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@depth@1000ms"
    );

    depthWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderBook({
        bids: data.b.slice(0, 5),
        asks: data.a.slice(0, 5)
      });
    };

    const tradeWs = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    tradeWs.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      setPrice(Number(trade.p));
    };

    return () => {
      depthWs.close();
      tradeWs.close();
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        price: form.price ? Number(form.price) : null
      })
    });

    const data = await res.json();
    setResult(data);
    setHistory((prev) => [data, ...prev]);
  };

  const runAI = async () => {
    const res = await fetch("http://127.0.0.1:8000/ai-trade");
    const data = await res.json();
    setResult(data);
    setHistory((prev) => [data, ...prev]);
  };

  useEffect(() => {
    if (!autoAI) return;
    const interval = setInterval(runAI, 5000);
    return () => clearInterval(interval);
  }, [autoAI]);

  const calculatePnL = (order) => {
    if (!price || !order?.order?.price) return 0;
    return (price - Number(order.order.price)).toFixed(2);
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 Trading Dashboard</h2>
        <p>BTC: ${price?.toFixed(2)}</p>
      </div>

      {/* CHART */}
      <div style={styles.chartContainer}>
        <Chart />
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* ORDER BOOK */}
        <div style={styles.card}>
          <h3> Order Book</h3>

          <div style={{ fontSize: "12px" }}>
            <p style={{ color: "red" }}>SELL</p>
            {orderBook.asks.map((a, i) => (
              <div key={i}>{a[0]} | {a[1]}</div>
            ))}

            <p style={{ color: "lightgreen", marginTop: "10px" }}>BUY</p>
            {orderBook.bids.map((b, i) => (
              <div key={i}>{b[0]} | {b[1]}</div>
            ))}
          </div>
        </div>

        {/* ORDER FORM */}
        <div style={styles.card}>
          <h3>Place Order</h3>

          <input name="symbol" value={form.symbol} onChange={handleChange} style={styles.input}/>
          <select name="side" value={form.side} onChange={handleChange} style={styles.input}>
            <option>BUY</option>
            <option>SELL</option>
          </select>

          <select name="type" value={form.type} onChange={handleChange} style={styles.input}>
            <option>MARKET</option>
            <option>LIMIT</option>
          </select>

          <input type="number" name="quantity" onChange={handleChange} style={styles.input}/>

          {form.type === "LIMIT" && (
            <input type="number" name="price" onChange={handleChange} style={styles.input}/>
          )}

          <button onClick={handleSubmit} style={styles.button}>Place Order</button>

          <button onClick={runAI} style={styles.aiButton}>Run AI</button>

          <button onClick={() => setAutoAI(!autoAI)} style={styles.toggle}>
            {autoAI ? "Stop AI" : "Start AI"}
          </button>
        </div>

        {/* ORDER TABLE */}
        <div style={styles.card}>
          <h3>Order History</h3>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Status</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>PnL</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, i) => {
                  const pnl = calculatePnL(item);

                  const qty = item.order?.quantity;
                  const priceVal = item.order?.price;
                  const state = item.order?.state;

                  return (
                    <tr key={i}>
                      <td>{item.order?.symbol || "-"}</td>

                      <td style={{
                        color: item.order?.side === "BUY" ? "#22c55e" : "#ef4444",
                        fontWeight: "bold"
                      }}>
                        {item.order?.side || "-"}
                      </td>

                      <td>
                        <span style={{
                          background:
                            state === "FILLED"
                              ? "#22c55e"
                              : state === "NEW"
                              ? "#f59e0b"
                              : "#ef4444",
                          padding: "3px 6px",
                          borderRadius: "5px",
                          fontSize: "11px"
                        }}>
                          {state || "PENDING"}
                        </span>
                      </td>

                      <td>
                        {qty && Number(qty) > 0
                          ? Number(qty).toFixed(4)
                          : "-"}
                      </td>

                      <td>
                        {priceVal && Number(priceVal) > 0
                          ? Number(priceVal).toFixed(2)
                          : "Market"}
                      </td>

                      <td style={{
                        color: pnl >= 0 ? "#22c55e" : "#ef4444",
                        fontWeight: "bold"
                      }}>
                        {pnl}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* STYLES (UNCHANGED) */
const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
    padding: "15px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  chartContainer: {
    margin: "20px 0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#0f172a",
    padding: "15px",
    borderRadius: "10px"
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    background: "#020617",
    border: "1px solid #333",
    color: "#fff"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    border: "none",
    marginTop: "5px"
  },
  aiButton: {
    width: "100%",
    padding: "10px",
    background: "#3b82f6",
    border: "none",
    marginTop: "5px"
  },
  toggle: {
    width: "100%",
    padding: "10px",
    background: "#f59e0b",
    border: "none",
    marginTop: "5px"
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  }
};

export default App;